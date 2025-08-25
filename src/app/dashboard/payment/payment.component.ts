import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InvoiceDto } from '../../../dtos/invoice/invoice.dto';
import { PaymentCreateDto } from '../../../dtos/payment/PaymentCreate.dto';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { PaymentResponseDto } from '../../../dtos/payment/PaymentResponse.dto';
import { PaymentStatusDetailEnum } from '../../../enum/payment/payment-status-detail.enum';
import { PaymentStatusEnum } from '../../../enum/payment/payment-status.enum';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  invoice: InvoiceDto;
  userId: string;
  paymentResponse: PaymentResponseDto;

  constructor(private http: HttpClient,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {

    this.invoice =  this.config.data.invoice;
    this.userId =  this.config.data.userId;
  }

  carregando: boolean = false;
 
  ngOnInit(): void {
   const paymentCreate: PaymentCreateDto = {
    invoiceId: this.invoice.invoiceId,
    userId: this.userId
   };

    this.carregando = true;
    this.http.post<CustomResponse<PaymentResponseDto>>(`https://localhost:7098/v1/payments/`, paymentCreate).subscribe({
      next: (res) => {
        if (res.success) {
          this.carregando = false;
          this.paymentResponse = res.data;
        }
      },
      error: (err) => {
        this.carregando = false;
        console.log("deu erro", err);
        //this.router.navigate(['/']);
        //this.messageService.add({ severity: 'error', summary: 'Info', detail: `Erro: ${err}` })
      }
    });
  }

}
