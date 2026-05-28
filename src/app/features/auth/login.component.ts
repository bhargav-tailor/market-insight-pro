import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../core/services';
import { ButtonComponent } from '../../shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ButtonComponent
  ],
  template: `
    <div class="login-container">
      <div class="login-background"></div>

      <div class="login-content">
        <div class="glassmorphism-card">
          <div class="card-header">
            <h1 class="title">Market Insight Pro</h1>
            <p class="subtitle">Real-time Stock Market Analytics</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="form">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Email or Username</mat-label>
              <input matInput formControlName="email" type="email" />
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Invalid email format
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Password</mat-label>
              <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password" />
              <button
                mat-icon-button
                matSuffix
                (click)="togglePasswordVisibility()"
                type="button"
              >
                <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <div class="form-options">
              <mat-checkbox formControlName="rememberMe" color="primary">
                Remember me
              </mat-checkbox>
              <a href="#" class="forgot-password">Forgot Password?</a>
            </div>

            <button-component
              label="Login"
              variant="primary"
              size="large"
              [loading]="isLoading"
              (click)="onLogin()"
              class="login-button"
            ></button-component>

            <div class="premium-section">
              <p class="premium-text">Unlock premium features</p>
              <button-component
                label="View Premium Plans"
                variant="outline"
                size="medium"
                (click)="navigateToPackages()"
              ></button-component>
            </div>
          </form>

          <div class="signup-section">
            <p class="signup-text">New to Market Insight Pro?</p>
            <a routerLink="/auth/signup" class="signup-link">Sign up now</a>
          </div>
        </div>

        <div class="market-ticker">
          <div class="ticker-content">
            <h3>Live Market Updates</h3>
            <div class="ticker-items">
              <div class="ticker-item">
                <span class="ticker-label">NIFTY 50</span>
                <span class="ticker-value">24,850.35</span>
                <span class="ticker-change positive">+0.61%</span>
              </div>
              <div class="ticker-item">
                <span class="ticker-label">SENSEX</span>
                <span class="ticker-value">81,325.50</span>
                <span class="ticker-change negative">-0.15%</span>
              </div>
              <div class="ticker-item">
                <span class="ticker-label">India VIX</span>
                <span class="ticker-value">14.25</span>
                <span class="ticker-change positive">+5.59%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .login-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="1200" height="600" fill="url(%23grid)"/></svg>');
      z-index: 0;
    }

    .login-content {
      display: flex;
      gap: 32px;
      width: 90%;
      max-width: 1000px;
      z-index: 10;
      position: relative;
    }

    .glassmorphism-card {
      flex: 1;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 48px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .card-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .title {
      font-size: 32px;
      font-weight: 700;
      color: #1e40af;
      margin: 0 0 8px 0;
    }

    .subtitle {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 8px 0 24px 0;
    }

    .forgot-password {
      color: #1e40af;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    .login-button {
      width: 100%;
      height: 48px;
      margin: 16px 0;
    }

    .premium-section {
      text-align: center;
      padding: 24px 0;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }

    .premium-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .signup-section {
      text-align: center;
      margin-top: 24px;
    }

    .signup-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .signup-link {
      color: #1e40af;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .market-ticker {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 32px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .ticker-content {
      text-align: center;
    }

    .ticker-content h3 {
      font-size: 20px;
      margin-bottom: 24px;
      margin-top: 0;
    }

    .ticker-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ticker-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ticker-label {
      font-size: 12px;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .ticker-value {
      font-size: 24px;
      font-weight: 700;
    }

    .ticker-change {
      font-size: 14px;
      font-weight: 600;

      &.positive {
        color: #10b981;
      }

      &.negative {
        color: #ef4444;
      }
    }

    @media (max-width: 768px) {
      .login-content {
        flex-direction: column;
      }

      .market-ticker {
        display: none;
      }

      .glassmorphism-card {
        padding: 32px;
      }

      .title {
        font-size: 24px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/app/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login failed:', err);
        }
      });
    }
  }

  navigateToPackages(): void {
    this.router.navigate(['/auth/packages']);
  }
}

import { RouterModule } from '@angular/router';
