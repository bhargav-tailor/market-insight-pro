import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginRequest, LoginResponse, User, SignupRequest, OtpRequest, OtpVerifyRequest, SubscriptionTier } from '../../models';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authSubject = new BehaviorSubject<User | null>(null);
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  public readonly auth$ = this.authSubject.asObservable();

  constructor() {
    this.loadAuthFromStorage();
  }

  /**
   * Load authentication from local storage
   */
  private loadAuthFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userStr = localStorage.getItem(this.userKey);
    
    if (token && userStr) {
      this.authSubject.next(JSON.parse(userStr));
    }
  }

  /**
   * Login user
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    // Mock API call with delay
    const response: LoginResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: request.email,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+91 9876543210',
        subscription: SubscriptionTier.PREMIUM
      }
    };

    return of(response).pipe(
      delay(500),
      tap(() => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.authSubject.next(response.user);
      })
    );
  }

  /**
   * Sign up user
   */
  signup(request: SignupRequest): Observable<LoginResponse> {
    // Mock API call with delay
    const response: LoginResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '2',
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        phoneNumber: request.phoneNumber,
        subscription: SubscriptionTier.FREE
      }
    };

    return of(response).pipe(
      delay(500),
      tap(() => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.authSubject.next(response.user);
      })
    );
  }

  /**
   * Request OTP
   */
  requestOtp(request: OtpRequest): Observable<{ success: boolean; message: string }> {
    return of({ success: true, message: 'OTP sent to ' + request.email }).pipe(delay(500));
  }

  /**
   * Verify OTP
   */
  verifyOtp(request: OtpVerifyRequest): Observable<{ success: boolean; token?: string }> {
    if (request.otp === '123456') {
      return of({ success: true, token: 'mock-token' }).pipe(delay(500));
    }
    return of({ success: false }).pipe(delay(500));
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authSubject.next(null);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.authSubject.value;
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.authSubject.value;
  }
}

import { tap } from 'rxjs/operators';
