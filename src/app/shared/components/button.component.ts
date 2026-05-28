import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'button-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, FormsModule],
  template: `
    <button
      mat-raised-button
      [ngClass]="buttonClasses"
      [disabled]="disabled || loading"
      [matTooltip]="tooltip"
      (click)="onClick.emit($event)"
      type="button"
    >
      <mat-icon *ngIf="icon && !loading" class="button-icon">{{ icon }}</mat-icon>
      <span class="button-spinner" *ngIf="loading"></span>
      {{ label }}
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      font-weight: 500;
      text-transform: none;
      letter-spacing: 0.5px;
      transition: all 0.3s ease-in-out;
    }

    .button-primary {
      background-color: #1e40af;
      color: white;

      &:hover:not(:disabled) {
        background-color: #1e3a8a;
        box-shadow: 0 4px 12px rgba(30, 64, 175, 0.4);
      }
    }

    .button-secondary {
      background-color: #f3f4f6;
      color: #1f2937;

      &:hover:not(:disabled) {
        background-color: #e5e7eb;
      }
    }

    .button-danger {
      background-color: #ef4444;
      color: white;

      &:hover:not(:disabled) {
        background-color: #dc2626;
      }
    }

    .button-success {
      background-color: #10b981;
      color: white;

      &:hover:not(:disabled) {
        background-color: #059669;
      }
    }

    .button-outline {
      border: 2px solid #1e40af;
      background-color: transparent;
      color: #1e40af;

      &:hover:not(:disabled) {
        background-color: #1e40af;
        color: white;
      }
    }

    .button-small {
      padding: 6px 12px;
      font-size: 12px;
      height: 32px;
    }

    .button-medium {
      padding: 8px 16px;
      font-size: 14px;
      height: 40px;
    }

    .button-large {
      padding: 12px 24px;
      font-size: 16px;
      height: 48px;
    }

    .button-icon {
      margin-right: 8px;
    }

    .button-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input() tooltip: string = '';
  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return `button-${this.variant} button-${this.size}`;
  }
}
