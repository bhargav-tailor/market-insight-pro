import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ButtonComponent } from '../../shared/components';
import { Package, SubscriptionTier } from '../../models';

type CheckoutStep = 'select' | 'details' | 'payment';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormsModule
  ],
  template: `
    <div class="packages-container">
      <div class="packages-header">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your trading needs</p>
      </div>

      <!-- Package Selection -->
      <div *ngIf="currentStep() === 'select'" class="packages-grid">
        <div
          *ngFor="let pkg of packages"
          class="package-card"
          [ngClass]="{ premium: pkg.isPremium }"
        >
          <div class="package-header">
            <h2 class="package-name">{{ pkg.name }}</h2>
            <span *ngIf="pkg.isPremium" class="premium-badge">PREMIUM</span>
          </div>

          <div class="package-price">
            <span class="currency">₹</span>
            <span class="amount">{{ pkg.price }}</span>
            <span class="period">{{ pkg.duration }}</span>
          </div>

          <div class="package-features">
            <h3>Features Included:</h3>
            <ul>
              <li *ngFor="let feature of pkg.features">
                <mat-icon>check_circle</mat-icon>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <button-component
            [label]="pkg.isPremium ? 'I Want This' : 'Sign Up Now'"
            [variant]="pkg.isPremium ? 'primary' : 'outline'"
            size="large"
            (click)="selectPackage(pkg)"
            class="package-button"
          ></button-component>
        </div>
      </div>

      <!-- Checkout Form -->
      <div *ngIf="currentStep() === 'details'" class="checkout-form">
        <h2>Checkout Details</h2>
        <form [formGroup]="checkoutForm" (ngSubmit)="onProceedToPayment()" class="form">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="fullName" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Address</mat-label>
            <input matInput formControlName="address" />
          </mat-form-field>

          <div class="form-actions">
            <button-component
              label="Back to Plans"
              variant="secondary"
              size="medium"
              (click)="goBackToSelect()"
            ></button-component>
            <button-component
              label="Proceed to Payment"
              variant="primary"
              size="medium"
              (click)="onProceedToPayment()"
            ></button-component>
          </div>
        </form>
      </div>

      <!-- Payment Form -->
      <div *ngIf="currentStep() === 'payment'" class="payment-form">
        <h2>Payment Information</h2>
        <form [formGroup]="paymentForm" (ngSubmit)="onPayment()" class="form">
          <div class="payment-method-selector">
            <button
              type="button"
              class="payment-method"
              [ngClass]="{ active: paymentMethod() === 'upi' }"
              (click)="paymentMethod.set('upi')"
            >
              <mat-icon>payment</mat-icon>
              <span>UPI</span>
            </button>
            <button
              type="button"
              class="payment-method"
              [ngClass]="{ active: paymentMethod() === 'card' }"
              (click)="paymentMethod.set('card')"
            >
              <mat-icon>credit_card</mat-icon>
              <span>Card</span>
            </button>
          </div>

          <!-- UPI -->
          <div *ngIf="paymentMethod() === 'upi'" class="payment-section">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>UPI ID</mat-label>
              <input matInput formControlName="upiId" placeholder="username@bank" />
            </mat-form-field>
          </div>

          <!-- Card -->
          <div *ngIf="paymentMethod() === 'card'" class="payment-section">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Card Number</mat-label>
              <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456" />
            </mat-form-field>

            <div class="card-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Expiry</mat-label>
                <input matInput formControlName="cardExpiry" placeholder="MM/YY" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>CVV</mat-label>
                <input matInput formControlName="cardCvv" placeholder="123" />
              </mat-form-field>
            </div>
          </div>

          <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>{{ selectedPackage?.name }}</span>
              <span>₹{{ selectedPackage?.price }}</span>
            </div>
            <div class="summary-total">
              <span>Total Amount</span>
              <span>₹{{ selectedPackage?.price }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button-component
              label="Back to Checkout"
              variant="secondary"
              size="medium"
              (click)="goBackToDetails()"
            ></button-component>
            <button-component
              label="Complete Payment"
              variant="primary"
              size="medium"
              [loading]="isProcessing()"
              (click)="onPayment()"
            ></button-component>
          </div>

          <div class="mock-note">
            💡 Mock Payment: Use any credentials to proceed
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .packages-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .packages-header {
      text-align: center;
      margin-bottom: 48px;

      h1 {
        font-size: 32px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: #6b7280;
      }
    }

    .packages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .package-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 16px;
      padding: 32px;
      transition: all 0.3s ease-in-out;
      position: relative;

      &:hover {
        border-color: #1e40af;
        box-shadow: 0 10px 30px rgba(30, 64, 175, 0.15);
        transform: translateY(-4px);
      }

      &.premium {
        border: 2px solid #f59e0b;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(30, 64, 175, 0.05));

        &:hover {
          border-color: #f59e0b;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.25);
        }
      }
    }

    .package-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .package-name {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .premium-badge {
      background: linear-gradient(135deg, #f59e0b, #f97316);
      color: white;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .package-price {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 24px;

      .currency {
        font-size: 18px;
        color: #6b7280;
      }

      .amount {
        font-size: 36px;
        font-weight: 700;
        color: #1e40af;
      }

      .period {
        font-size: 14px;
        color: #6b7280;
        margin-left: 4px;
      }
    }

    .package-features {
      margin-bottom: 24px;

      h3 {
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 16px 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
        font-size: 14px;
        color: #6b7280;

        mat-icon {
          color: #10b981;
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }

    .package-button {
      width: 100%;
    }

    .checkout-form,
    .payment-form {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 0 auto;

      h2 {
        font-size: 24px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 24px;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    .card-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .payment-method-selector {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }

    .payment-method {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      font-size: 14px;
      font-weight: 500;

      &:hover {
        border-color: #1e40af;
      }

      &.active {
        border-color: #1e40af;
        background-color: rgba(30, 64, 175, 0.05);
        color: #1e40af;
      }

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .payment-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 24px 0;
    }

    .order-summary {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;

      h3 {
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 12px 0;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 700;
        color: #1f2937;
        padding-top: 12px;
        border-top: 1px solid #e5e7eb;
      }
    }

    .form-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 24px;
    }

    .mock-note {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      padding: 12px;
      background-color: #f9fafb;
      border-radius: 8px;
      margin-top: 16px;
    }

    @media (max-width: 768px) {
      .packages-grid {
        grid-template-columns: 1fr;
      }

      .card-row {
        grid-template-columns: 1fr;
      }

      .packages-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class PackagesComponent {
  currentStep = signal<CheckoutStep>('select');
  paymentMethod = signal<'upi' | 'card'>('upi');
  isProcessing = signal(false);

  packages: Package[] = [
    {
      id: '1',
      name: '3 Months Access',
      tier: SubscriptionTier.BASIC,
      price: 2999,
      duration: '3 months',
      isPremium: false,
      features: [
        'Real-time market data',
        'Basic technical analysis',
        'Watchlist management',
        'Price alerts',
        'Mobile app access'
      ]
    },
    {
      id: '2',
      name: 'DIAMOND',
      tier: SubscriptionTier.PREMIUM,
      price: 9999,
      duration: '1 year',
      isPremium: true,
      features: [
        'All basic features',
        'Advanced analytics',
        'Options chain analysis',
        'Portfolio management',
        'Advanced charting',
        'Priority support',
        'API access',
        'Custom alerts'
      ]
    }
  ];

  selectedPackage: Package | null = null;
  checkoutForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeForms();
  }

  initializeForms(): void {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.paymentForm = this.formBuilder.group({
      upiId: [''],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: ['']
    });
  }

  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
    this.currentStep.set('details');
  }

  goBackToSelect(): void {
    this.currentStep.set('select');
  }

  onProceedToPayment(): void {
    if (this.checkoutForm.valid) {
      this.currentStep.set('payment');
    }
  }

  goBackToDetails(): void {
    this.currentStep.set('details');
  }

  onPayment(): void {
    this.isProcessing.set(true);
    setTimeout(() => {
      this.isProcessing.set(false);
      alert('Payment processed successfully! Your subscription has been activated.');
      this.router.navigate(['/app/dashboard']);
    }, 2000);
  }
}
