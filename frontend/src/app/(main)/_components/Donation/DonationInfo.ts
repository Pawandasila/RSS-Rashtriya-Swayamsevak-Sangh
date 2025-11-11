export interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface QRCodeInfo {
  image: string;
  alt: string;
  description: string;
}

export interface DonationData {
  title: string;
  description: string;
  qrCode: QRCodeInfo;
  bankDetails: BankDetails;
}

export const donationData: DonationData = {
  title: "Support Nation Building",
  description: "Your contribution to Rashtriya Seva Sangh's service work is invaluable. Please scan the QR code below or donate directly to the bank account.",
  qrCode: {
    image: "/hero/qr-code.jpg",
    alt: "QR Code for Donation",
    description: "📲 Scan and Donate"
  },
  bankDetails: {
    accountName: "Rashtriya Seva Sangh",
    bankName: "Uttarakhand Gramin Bank",
    accountNumber: "76032104282",
    ifscCode: "SBIN0RRUTGB"
  }
};