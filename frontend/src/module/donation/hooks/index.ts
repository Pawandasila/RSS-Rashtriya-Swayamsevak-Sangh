"use client";

import { useState, useCallback, useEffect } from 'react';
import { 
  createOrder, 
  verifyPayment, 
  getHistory, 
  downloadReceipt,
  type DonationFormData,
  type CreateOrderResponse,
  type VerifyPaymentData,
  type PaymentVerificationResponse,
  type DonationRecord 
} from '../action';

// Types for Razorpay integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, any>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Hook for Razorpay script loading
export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      setIsLoading(true);
      setError(null);

      // Check if already loaded
      if (typeof window.Razorpay !== 'undefined') {
        setIsLoaded(true);
        setIsLoading(false);
        resolve(true);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        setIsLoaded(true);
        setIsLoading(false);
        resolve(true);
        return;
      }

      // Load script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
        resolve(true);
      };
      script.onerror = () => {
        setError('Failed to load Razorpay payment gateway');
        setIsLoading(false);
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  return { isLoaded, isLoading, error, loadScript };
}

// Hook for donation payment processing
export function useDonationPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const { isLoaded, loadScript } = useRazorpay();

  const processPayment = useCallback(async (formData: DonationFormData) => {
    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(false);

      // Ensure Razorpay is loaded
      if (!isLoaded) {
        const loaded = await loadScript();
        if (!loaded) {
          throw new Error('Payment gateway failed to load. Please check your internet connection.');
        }
      }

      // Create order on server
      const orderResponse: CreateOrderResponse = await createOrder(formData);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.error || 'Failed to create payment order');
      }

      if (!orderResponse.orderId) {
        throw new Error('No order ID received from server');
      }

      // Prepare Razorpay options
      const options: RazorpayOptions = {
        key: orderResponse.razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: (orderResponse.amount || 0) * 100, // Convert to paise
        currency: orderResponse.currency || 'INR',
        name: 'RSS - Rashtriya Swayamsevak Sangh',
        description: `Donation - ${formData.donationType}`,
        image: '/logo/logo.png',
        order_id: orderResponse.orderId,
        handler: async (response: PaymentResponse) => {
          try {
            // Verify payment on server
            const verificationData: VerifyPaymentData = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              donationDetails: formData,
            };

            const verificationResponse: PaymentVerificationResponse = await verifyPayment(verificationData);

            if (verificationResponse.success && verificationResponse.paymentVerified) {
              setSuccess(true);
              setDonationId(verificationResponse.donationId || null);
              setReceiptUrl(verificationResponse.receiptUrl || null);
            } else {
              throw new Error(verificationResponse.error || 'Payment verification failed');
            }
          } catch (verifyError: any) {
            setError(verifyError.message || 'Payment verification failed');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          donation_type: formData.donationType,
          anonymous: formData.anonymous.toString(),
          message: formData.message || '',
        },
        theme: {
          color: '#FF9933', // RSS theme color
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setError('Payment cancelled by user');
          }
        }
      };

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: any) {
      setError(error.message || 'An error occurred during payment processing');
      setIsProcessing(false);
    }
  }, [isLoaded, loadScript]);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setError(null);
    setSuccess(false);
    setDonationId(null);
    setReceiptUrl(null);
  }, []);

  return {
    processPayment,
    isProcessing,
    error,
    success,
    donationId,
    receiptUrl,
    reset,
  };
}

// Hook for donation history management
export function useDonationHistory() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchHistory = useCallback(async (limit: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getHistory(limit);

      if (response.success) {
        setDonations(response.donations || []);
        setTotal(response.total || 0);
      } else {
        setError(response.error || 'Failed to fetch donation history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch donation history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadReceiptById = useCallback(async (donationId: string) => {
    try {
      const response = await downloadReceipt(donationId);
      
      if (response.success && response.receiptUrl) {
        // Open receipt in new tab
        window.open(response.receiptUrl, '_blank');
      } else {
        throw new Error(response.error || 'Failed to generate receipt download link');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to download receipt');
    }
  }, []);

  return {
    donations,
    isLoading,
    error,
    total,
    fetchHistory,
    downloadReceiptById,
  };
}

// Hook for donation form state management
export function useDonationForm() {
  const [step, setStep] = useState<'form' | 'payment' | 'success' | 'error'>('form');
  const [formData, setFormData] = useState<Partial<DonationFormData>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const updateFormData = useCallback((data: Partial<DonationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear validation errors for updated fields
    const updatedFields = Object.keys(data);
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  }, []);

  const validateForm = useCallback((data: DonationFormData): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = data.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Amount validation
    if (!data.amount || data.amount < 1) {
      errors.amount = 'Please enter a valid donation amount';
    } else if (data.amount > 500000) {
      errors.amount = 'Maximum donation amount is ₹5,00,000';
    }

    // Donation type validation
    if (!data.donationType) {
      errors.donationType = 'Please select a donation type';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  const goToStep = useCallback((newStep: typeof step) => {
    setStep(newStep);
  }, []);

  const reset = useCallback(() => {
    setStep('form');
    setFormData({});
    setValidationErrors({});
  }, []);

  return {
    step,
    formData,
    validationErrors,
    updateFormData,
    validateForm,
    goToStep,
    reset,
  };
}

// Hook for local storage donation tracking
export function useLocalDonations() {
  const [localDonations, setLocalDonations] = useState<any[]>([]);

  const saveLocalDonation = useCallback((donation: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('rss_donations') || '[]');
      const updated = [donation, ...existing].slice(0, 10); // Keep last 10
      localStorage.setItem('rss_donations', JSON.stringify(updated));
      setLocalDonations(updated);
    } catch (error) {
      console.warn('Failed to save donation locally:', error);
    }
  }, []);

  const loadLocalDonations = useCallback(() => {
    try {
      const donations = JSON.parse(localStorage.getItem('rss_donations') || '[]');
      setLocalDonations(donations);
      return donations;
    } catch (error) {
      console.warn('Failed to load local donations:', error);
      return [];
    }
  }, []);

  const clearLocalDonations = useCallback(() => {
    try {
      localStorage.removeItem('rss_donations');
      setLocalDonations([]);
    } catch (error) {
      console.warn('Failed to clear local donations:', error);
    }
  }, []);

  useEffect(() => {
    loadLocalDonations();
  }, [loadLocalDonations]);

  return {
    localDonations,
    saveLocalDonation,
    loadLocalDonations,
    clearLocalDonations,
  };
}

// Utility hook for formatting currency
export function useCurrency() {
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatNumber = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-IN').format(amount);
  }, []);

  return { formatCurrency, formatNumber };
}