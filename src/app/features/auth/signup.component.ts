import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../core/services';
import { ButtonComponent, CardComponent } from '../../shared/components';

type SignupStep = 'form' | 'otp';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ButtonComponent,
    CardComponent,
    FormsModule
  ],
  template: `
    <div class="signup-container">
      <div class="signup-background"></div>

      <div class="signup-content">
        <app-card class="signup-card">
          <h1 class="signup-title">Create Your Account</h1>
          <p class="signup-subtitle">Join Market Insight Pro today</p>

          <div class="step-indicator">
            <div class="step" [ngClass]="{ active: currentStep() === 'form' }">
              <span class="step-number">1</span>
              <span class="step-label">Registration</span>
            </div>
            <div class="step-connector" [ngClass]="{ active: currentStep() === 'otp' }"></div>
            <div class="step" [ngClass]="{ active: currentStep() === 'otp' }">
              <span class="step-number">2</span>
              <span class="step-label">Verification</span>
            </div>
          </div>

          <!-- Registration Form -->
          <form
            *ngIf="currentStep() === 'form'"
            [formGroup]="registrationForm"
            (ngSubmit)="onRegister()"
            class="form"
          >
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName" />
              <mat-error>First name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName" />
              <mat-error>Last name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Phone Number</mat-label>
              <input matInput formControlName="phoneNumber" />
              <mat-error>Phone number is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" formControlName="email" />
              <mat-error *ngIf="registrationForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="registrationForm.get('email')?.hasError('email')">
                Invalid email format
              </mat-error>
            </mat-form-field>

            <button-component
              label="Generate OTP & Register"
              variant="primary"
              size="large"
              [loading]="isLoading"
              (click)="onRegister()"
              class="signup-button"
            ></button-component>

            <div class="login-link">
              <span>Already have an account?</span>
              <a routerLink="/auth/login">Login here</a>
            </div>
          </form>

          <!-- OTP Verification -->
          <div *ngIf="currentStep() === 'otp'" class="otp-section">
            <p class="otp-message">OTP sent to {{ registrationForm.get('email')?.value }}</p>

            <div class="otp-inputs">
              <input
                *ngFor="let digit of otpDigits; let i = index"
                type="text"
                class="otp-input"
                [value]="otpDigits[i]"
                maxlength="1"
                (input)="onOtpInput($event, i)"
                (keydown)="onOtpKeydown($event, i)"
                #otpInput
              />
            </div>

            <button-component
              label="Verify OTP"
              variant="primary"
              size="large"
              [loading]="isLoading"
              (click)="onVerifyOtp()"
              class="verify-button"
            ></button-component>

            <button
              mat-button
              (click)="onResendOtp()"
              [disabled]="resendTimer() > 0"
              class="resend-btn"
            >
              <span *ngIf="resendTimer() === 0">Resend OTP</span>
              <span *ngIf="resendTimer() > 0">Resend in {{ resendTimer() }}s</span>
            </button>

            <button mat-button (click)="goBackToForm()" class="back-btn">
              Back to Registration
            </button>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .signup-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
      padding: 20px;
    }

    .signup-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="1200" height="600" fill="url(%23grid)"/></svg>');
      z-index: 0;
    }

    .signup-content {
      width: 100%;
      max-width: 500px;
      z-index: 10;
      position: relative;
    }

    .signup-card {
      padding: 48px;
    }

    .signup-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e40af;
      margin: 0 0 8px 0;
      text-align: center;
    }

    .signup-subtitle {
      font-size: 14px;
      color: #6b7280;
      text-align: center;
      margin-bottom: 32px;
    }

    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .step-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #e5e7eb;
      color: #6b7280;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease-in-out;
    }

    .step.active .step-number {
      background-color: #1e40af;
      color: white;
    }

    .step-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .step.active .step-label {
      color: #1e40af;
      font-weight: 600;
    }

    .step-connector {
      width: 40px;
      height: 2px;
      background-color: #e5e7eb;
      transition: all 0.3s ease-in-out;
    }

    .step-connector.active {
      background-color: #1e40af;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    .signup-button {
      width: 100%;
      height: 48px;
      margin: 16px 0;
    }

    .login-link {
      text-align: center;
      font-size: 14px;
      color: #6b7280;

      a {
        color: #1e40af;
        font-weight: 600;
        text-decoration: none;
        margin-left: 4px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .otp-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .otp-message {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .otp-inputs {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .otp-input {
      width: 48px;
      height: 48px;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      outline: none;
      transition: all 0.3s ease-in-out;

      &:focus {
        border-color: #1e40af;
        box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
      }

      &:hover {
        border-color: #d1d5db;
      }
    }

    .verify-button {
      width: 100%;
      height: 48px;
      margin: 16px 0;
    }

    .resend-btn,
    .back-btn {
      width: 100%;
      color: #1e40af;

      &:hover:not(:disabled) {
        background-color: rgba(30, 64, 175, 0.1);
      }

      &:disabled {
        opacity: 0.6;
      }
    }

    @media (max-width: 480px) {
      .signup-card {
        padding: 32px;
      }

      .signup-title {
        font-size: 24px;
      }

      .otp-inputs {
        gap: 8px;
      }

      .otp-input {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  `]
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  currentStep = signal<SignupStep>('form');
  isLoading: boolean = false;
  otpDigits: string[] = ['', '', '', '', '', ''];
  resendTimer = signal(0);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRegister(): void {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.authService.requestOtp({ email: this.registrationForm.get('email')?.value }).subscribe({
        next: () => {
          this.isLoading = false;
          this.currentStep.set('otp');
          this.startResendTimer();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('OTP request failed:', err);
        }
      });
    }
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d?$/.test(value)) {
      input.value = '';
      return;
    }

    this.otpDigits[index] = value;

    if (value && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;
      prevInput?.focus();
    }
  }

  onVerifyOtp(): void {
    const otp = this.otpDigits.join('');
    if (otp.length === 6) {
      this.isLoading = true;
      const email = this.registrationForm.get('email')?.value;
      this.authService.verifyOtp({ email, otp }).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.authService.signup(this.registrationForm.value).subscribe({
              next: () => {
                this.router.navigate(['/app/dashboard']);
              },
              error: (err) => {
                console.error('Signup failed:', err);
              }
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('OTP verification failed:', err);
        }
      });
    }
  }

  onResendOtp(): void {
    const email = this.registrationForm.get('email')?.value;
    this.authService.requestOtp({ email }).subscribe({
      next: () => {
        this.otpDigits = ['', '', '', '', '', ''];
        this.startResendTimer();
      },
      error: (err) => {
        console.error('Resend OTP failed:', err);
      }
    });
  }

  goBackToForm(): void {
    this.currentStep.set('form');
    this.otpDigits = ['', '', '', '', '', ''];
  }

  private startResendTimer(): void {
    this.resendTimer.set(60);
    const interval = setInterval(() => {
      this.resendTimer.update(v => {
        if (v <= 1) {
          clearInterval(interval);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }
}

import { RouterModule } from '@angular/router';
