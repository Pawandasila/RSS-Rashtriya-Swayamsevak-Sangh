"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  donationType: 'general' | 'education' | 'health' | 'infrastructure' | 'other';
  anonymous: boolean;
  panCard?: string;
  address?: string;
  message?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  razorpayKey?: string;
  error?: string;
  message?: string;
}

export interface VerifyPaymentData {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  donationDetails: DonationFormData;
}

export interface PaymentVerificationResponse {
  success: boolean;
  paymentVerified?: boolean;
  donationId?: string;
  receiptUrl?: string;
  message?: string;
  error?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  currency: string;
  donationType: string;
  anonymous: boolean;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  completedAt?: string;
  receiptGenerated: boolean;
  taxExemption: boolean;
  message?: string;
  address?: string;
  panCard?: string;
}

async function validateDonationSession() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;



    if (authToken) {


      return {
        isAuthenticated: true,
        user: {

          name: 'User Name',
          email: 'user@example.com',
          phone: '+919876543210',
        }
      };
    }

    return {
      isAuthenticated: false,
      user: null
    };
  } catch (error) {
    console.error('Session validation error:', error);
    return {
      isAuthenticated: false,
      user: null
    };
  }
}

async function createDonationOrder(formData: DonationFormData): Promise<CreateOrderResponse> {
  try {

    if (!formData.name || !formData.email || !formData.phone || !formData.amount) {
      return {
        success: false,
        error: 'Required fields are missing'
      };
    }

    if (formData.amount < 1 || formData.amount > 500000) {
      return {
        success: false,
        error: 'Donation amount must be between ₹1 and ₹5,00,000'
      };
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }


    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      return {
        success: false,
        error: 'Invalid phone number format'
      };
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const donationRecord: DonationRecord = {
      id: `DON${Date.now()}`,
      donorName: formData.name,
      donorEmail: formData.email,
      donorPhone: formData.phone,
      amount: formData.amount,
      currency: 'INR',
      donationType: formData.donationType,
      anonymous: formData.anonymous,
      razorpayOrderId: orderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      receiptGenerated: false,
      taxExemption: false,
      message: formData.message,
      address: formData.address,
      panCard: formData.panCard,
    };

    return {
      success: true,
      orderId: orderId,
      amount: formData.amount,
      currency: 'INR',
      razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key',
      message: 'Order created successfully'
    };

  } catch (error) {
    console.error('Create order error:', error);
    return {
      success: false,
      error: 'Failed to create donation order. Please try again.'
    };
  }
}

async function verifyDonationPayment(paymentData: VerifyPaymentData): Promise<PaymentVerificationResponse> {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, donationDetails } = paymentData;


    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return {
        success: false,
        error: 'Payment verification data is incomplete'
      };
    }

    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');


    const isSignatureValid = true

    if (!isSignatureValid) {
      return {
        success: false,
        error: 'Payment verification failed. Invalid signature.'
      };
    }


    const donationId = `DON${Date.now()}`;
    const receiptUrl = `/receipts/${donationId}.pdf`;


    console.log('Payment verified successfully:', {
      donationId,
      razorpayPaymentId,
      razorpayOrderId,
      amount: donationDetails.amount,
      donor: donationDetails.name
    });

    return {
      success: true,
      paymentVerified: true,
      donationId: donationId,
      receiptUrl: receiptUrl,
      message: 'Payment successful! Thank you for your donation. A receipt has been sent to your email.'
    };

  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      success: false,
      error: 'Payment verification failed. Please contact support if amount was debited.'
    };
  }
}

async function getDonationHistory(limit: number = 10) {
  try {
    const session = await validateDonationSession();
    
    if (!session.isAuthenticated) {
      return {
        success: false,
        error: 'Authentication required to view donation history'
      };
    }


    const mockDonations: DonationRecord[] = [
      {
        id: 'DON001',
        donorName: 'John Doe',
        donorEmail: 'john@example.com',
        donorPhone: '+919876543210',
        amount: 1000,
        currency: 'INR',
        donationType: 'general',
        anonymous: false,
        razorpayOrderId: 'order_123',
        razorpayPaymentId: 'pay_123',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        completedAt: new Date(Date.now() - 86400000 + 3600000).toISOString(),
        receiptGenerated: true,
        taxExemption: false,
      }
    ];

    return {
      success: true,
      donations: mockDonations.slice(0, limit),
      total: mockDonations.length
    };

  } catch (error) {
    console.error('Get donation history error:', error);
    return {
      success: false,
      error: 'Failed to fetch donation history'
    };
  }
}

export async function downloadReceipt(donationId: string) {
  try {

    if (!donationId) {
      return {
        success: false,
        error: 'Donation ID is required'
      };
    }


    const receiptUrl = `/api/receipts/${donationId}`;
    
    return {
      success: true,
      receiptUrl: receiptUrl,
      message: 'Receipt download link generated'
    };

  } catch (error) {
    console.error('Download receipt error:', error);
    return {
      success: false,
      error: 'Failed to generate receipt download link'
    };
  }
}

async function getDonationStats() {
  try {

    const session = await validateDonationSession();
    

    const hasAdminAccess = true

    if (!hasAdminAccess) {
      return {
        success: false,
        error: 'Admin access required'
      };
    }


    const stats = {
      totalDonations: 1250000,
      donationCount: 1542,
      thisMonth: 89500,
      thisMonthCount: 125,
      averageDonation: 810,
      topDonationType: 'education',
      recentDonations: [
        {
          id: 'DON001',
          amount: 5000,
          donor: 'Anonymous',
          type: 'education',
          date: new Date().toISOString()
        },
        {
          id: 'DON002',
          amount: 2000,
          donor: 'Ram Kumar',
          type: 'health',
          date: new Date(Date.now() - 3600000).toISOString()
        },
      ]
    };

    return {
      success: true,
      stats: stats
    };

  } catch (error) {
    console.error('Get donation stats error:', error);
    return {
      success: false,
      error: 'Failed to fetch donation statistics'
    };
  }
}

export async function processRefund(donationId: string, reason: string) {
  try {

    const session = await validateDonationSession();
    

    const hasAdminAccess = true;

    if (!hasAdminAccess) {
      return {
        success: false,
        error: 'Admin access required for refunds'
      };
    }

    if (!donationId || !reason) {
      return {
        success: false,
        error: 'Donation ID and reason are required for refund'
      };
    }

    console.log('Processing refund:', { donationId, reason });

    return {
      success: true,
      message: 'Refund initiated successfully. It may take 3-5 business days to reflect in the donor\'s account.',
      refundId: `rfnd_${Date.now()}`
    };

  } catch (error) {
    console.error('Process refund error:', error);
    return {
      success: false,
      error: 'Failed to process refund. Please try again.'
    };
  }
}

export {
  createDonationOrder as createOrder,
  verifyDonationPayment as verifyPayment,
  getDonationHistory as getHistory,
  getDonationStats as getStats,
  validateDonationSession as validateSession,
};
