import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InvoiceDto } from '../../../dtos/invoice/invoice.dto';
import { PaymentCreateDto } from '../../../dtos/payment/PaymentCreate.dto';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { PaymentResponseDto } from '../../../dtos/payment/PaymentResponse.dto';
import { PaymentStatusDetailEnum } from '../../../enum/payment/payment-status-detail.enum';
import { PaymentStatusEnum } from '../../../enum/payment/payment-status.enum';
import { MessageService } from 'primeng/api';
import { SignalRService } from '../../../services/signal-r.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

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
  statusApproved: boolean = false;
  statusRejected: boolean = false;
  statusInprocess: boolean = false;

  constructor(private http: HttpClient,
    private readonly signalRService: SignalRService,
    private readonly handleError: ErrorHandlerService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
  ) {

    this.invoice = this.config.data.invoice;
    this.userId = this.config.data.userId;
  }

  carregando: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('tokenPortal') || '';
    this.signalRService.startConnection(token);

    this.signalRService.paymentApproved$.subscribe((data) => {
      console.log("Notificaod pelo signal", data);
      if (data.status === "Aprroved") {
        this.statusApproved = true;
        this.statusInprocess = false;
        this.statusRejected = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Pagamento aprovado',
          detail: `Seu pagamento foi aprovado com sucesso!`
        });
      } else if (data.status === "Pending") {
        this.statusInprocess = true;
        this.statusApproved = false;
        this.statusRejected = false;
      }else{
        this.statusInprocess = false;
        this.statusApproved = false;
        this.statusRejected = true;
      }
    });

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
        this.handleError.handleError(err);
        console.log("deu erro", err);
        //this.router.navigate(['/']);
        //this.messageService.add({ severity: 'error', summary: 'Info', detail: `Erro: ${err}` })
      }
    });
  }

  copy() {
    this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Copiado!' })
  }
}
