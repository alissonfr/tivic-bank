import { Component, OnInit, EventEmitter } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { UserService } from 'src/app/services/user.service';
import { Security } from 'src/app/utils/security.util';
import { User } from 'src/app/models/user';
import { BankAccount } from 'src/app/models/bank-account';
import { CadastrarTransacaoComponent } from 'src/app/modals/cadastrar-transacao/cadastrar-transacao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/Transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  user!: User;
  bankAccount!: BankAccount;
  transactions!: Transaction[];
  loading = false;
  operation: number | null = null;
  balance: number = 0

  viewBalance = true;

  constructor(
    private bankAccountService: BankAccountService,
    private transactionsService: TransactionsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = Security.getUser();
    this.fetchBankAccountUser();
  }

  toggleViewBalance() {
    this.viewBalance = !this.viewBalance;
  }

  fetchBankAccountUser() {
    this.loading = true;

    const data = {
      cod_user: this.user.id_user
    }

    this.bankAccountService.fetchBankAccountUser(data).subscribe({
      next: (res) => {
        this.bankAccount = res.bank_account
        this.balance = res.bank_account.balance
        console.log(this.bankAccount)
        this.fetchTransactions();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  changeOperation(operation: number) {
    if (this.operation === operation) {
      this.operation = null;
    } else {
      this.operation = operation;
    }

    this.fetchTransactions();
  }

  openModalNewTransaction(type: number) {
    const modalRef = this.modalService.open(CadastrarTransacaoComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.title = type === 1 ? 'Novo saque' : 'Novo deposito';
    modalRef.componentInstance.bankAccount = {
      operation: type,
      cod_bank_account: this.bankAccount.id_bank_account
    };
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.fetchBankAccountUser();
    });
  }

  fetchTransactions() {
    this.loading = true;

    const data: any = {
      cod_bank_account: this.bankAccount.id_bank_account
    }

    if (this.operation) {
      data.operation = this.operation;
    }

    this.transactionsService.fetchTransactions(data).subscribe({
      next: (res) => {
        this.transactions = res.transactions

        const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        this.transactions.forEach(transaction => {
          const date: Date = new Date(transaction.date_created);
          transaction.day_week = daysOfWeek[date.getUTCDay()];
          transaction.day = date.getUTCDate();
          transaction.month = months[date.getUTCMonth()];
          transaction.year = date.getUTCFullYear().toString();
        });
        console.log(this.transactions)
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  isAmountNegative(): boolean {
    if (this.bankAccount.balance < 0) {
      return true
    }
    return false
  }
}
