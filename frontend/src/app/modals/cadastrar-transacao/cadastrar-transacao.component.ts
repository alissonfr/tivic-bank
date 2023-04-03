import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from 'src/app/models/Transaction';
import { User } from 'src/app/models/user';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-cadastrar-transacao',
  templateUrl: './cadastrar-transacao.component.html',
  styleUrls: ['./cadastrar-transacao.component.scss']
})
export class CadastrarTransacaoComponent {
  form: FormGroup = this.formBuilder.group({
    amount: [null, Validators.required],
    operation: [null],
    cod_bank_account: [null]
  });

  @Input() bankAccount: Transaction;
  @Input() title: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  isLoading = false;
  userData!: User;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userData = Security.getUser();
  }

  closeModal() {
    this.modalService.dismissAll();
    this.passEntry.emit(1);
  }

  onSubmit() {
    this.isLoading = true;
    const data = this.form.value
    this.createTransaction(data);
  }

  createTransaction(data: Partial<Transaction>) {
    data.operation = this.bankAccount.operation;
    data.cod_bank_account = this.bankAccount.operation;
    this.transactionsService.setTransaction(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.form.reset();
        this.toastr.success('Transação criada com sucesso!');
        this.closeModal();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.mensagem);
        this.isLoading = false;
      }
    });
  }

  verifyFieldIsValid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      this.form.get(field)?.touched &&
      this.form.get(field)?.dirty
    );
  }
}
