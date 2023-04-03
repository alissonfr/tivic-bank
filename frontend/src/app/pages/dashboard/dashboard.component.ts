import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { UserService } from 'src/app/services/user.service';
import { Security } from 'src/app/utils/security.util';
import { User } from 'src/app/models/user';
import { BankAccount } from 'src/app/models/bank-account';
import { CadastrarTransacaoComponent } from 'src/app/modals/cadastrar-transacao/cadastrar-transacao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  loading = false;
  viewBalance = true;
  operation: number | null = null

  constructor(
    private bankAccountService: BankAccountService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = Security.getUser();
    this.fetchBankAccountUser();
  }

  fetchBankAccountUser() {
    this.loading = true;

    const data = {
      cod_user: this.user.id_user
    }

    this.bankAccountService.fetchBankAccountUser(data).subscribe({
      next: (res) => {
        this.bankAccount = res.bank_account
        console.log(this.bankAccount)
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  changeViewBalance() {
    this.viewBalance = !this.viewBalance
  }

  changeOperation(operation: number) {
    if (this.operation === operation) {
      this.operation = null;
    } else {
      this.operation = operation;
    }
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
      // this.fetchTransactions();
    });
  }
}
