import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarTransacaoComponent } from './cadastrar-transacao/cadastrar-transacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from 'src/app/utils/currency-mask-config.utils';


@NgModule({
  declarations: [
    CadastrarTransacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    CadastrarTransacaoComponent
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    },
    provideNgxMask()
  ]
})
export class ModalsModule { }
