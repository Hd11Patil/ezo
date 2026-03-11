import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

@Component({
  selector: 'app-atm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent {
  balance: number = 1200.00;
  transactionAmount: string = '';
  isDeposit: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  transactions: Transaction[] = [
    { date: '10/25/2023', description: 'Withdrawal', amount: 100.00, type: 'withdrawal' },
    { date: '10/25/2023', description: 'Withdrawal', amount: 100.00, type: 'withdrawal' },
    { date: '10/24/2023', description: 'Deposit',    amount: 500.00, type: 'deposit' },
    { date: '10/24/2023', description: 'Deposit',    amount: 600.00, type: 'deposit' },
  ];

  get modeLabel(): string {
    return this.isDeposit ? 'DEPOSIT' : 'CREDIT';
  }

  toggleMode(): void {
    this.isDeposit = !this.isDeposit;
    this.errorMessage = '';
    this.successMessage = '';
    this.transactionAmount = '';
  }

  submitTransaction(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const amount = parseFloat(this.transactionAmount);

    if (!this.transactionAmount || isNaN(amount) || amount <= 0) {
      this.errorMessage = 'Please enter a valid positive amount.';
      return;
    }

    if (!this.isDeposit && amount > this.balance) {
      this.errorMessage = 'Insufficient funds for this withdrawal.';
      return;
    }

    const today = new Date();
    const dateStr = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    if (this.isDeposit) {
      this.balance += amount;
      this.transactions.unshift({
        date: dateStr,
        description: 'Deposit',
        amount: amount,
        type: 'deposit'
      });
      this.successMessage = `Successfully deposited $${amount.toFixed(2)}`;
    } else {
      this.balance -= amount;
      this.transactions.unshift({
        date: dateStr,
        description: 'Withdrawal',
        amount: amount,
        type: 'withdrawal'
      });
      this.successMessage = `Successfully withdrew $${amount.toFixed(2)}`;
    }

    this.transactionAmount = '';
  }
}
