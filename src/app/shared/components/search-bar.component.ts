import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <div class="search-container">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Search</mat-label>
        <input
          matInput
          [(ngModel)]="searchQuery"
          (keyup.enter)="onSearch()"
          [placeholder]="placeholder"
        />
        <button mat-icon-button matSuffix (click)="onSearch()" [disabled]="!searchQuery">
          <mat-icon>search</mat-icon>
        </button>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
    }

    .search-field {
      width: 100%;
    }

    ::ng-deep .mat-mdc-form-field-focus-overlay {
      background-color: transparent;
    }
  `]
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery);
    }
  }
}
