export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  subscription?: SubscriptionTier;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = '3months',
  PREMIUM = 'diamond'
}

export interface Package {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  duration: string;
  features: string[];
  isPremium: boolean;
}
