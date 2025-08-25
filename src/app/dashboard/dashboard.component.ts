import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UserFullDto } from '../../dtos/user/user-full.dto';
import { PlanTypeEnum } from '../../enum/plan/plan-type.enum';
import { InvoiceDto } from '../../dtos/invoice/invoice.dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentComponent } from './payment/payment.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DialogService]
})
export class DashboardComponent implements OnInit {
  ref: DynamicDialogRef;
  items: MenuItem[];
  home: MenuItem
  userId: string;
  itemsMenu = [
    {
      label: 'Dados Cadastrais',
      icon: 'pi pi-user',
      command: () => {
      },
    },
    {
      label: 'Faturas',
      icon: 'pi pi-calendar',
      command: () => {
      },
    },
    {
      separator: true,
    },
    {
      label: 'Sair',
      icon: 'pi pi-power-off',
      command: () => {
        this.sair();
      },
    }
  ];

  user: UserFullDto;
  loading: boolean = true;

  //Dicionário de enums
  typeplan: Record<PlanTypeEnum, string> = {
    [PlanTypeEnum.basic]: 'Básico',
    [PlanTypeEnum.family]: 'Família',
    [PlanTypeEnum.business]: 'Empresarial',
  }
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.items = [
      { label: 'Principal' },

    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenPortal');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.nameid;
      this.getUserById(this.userId);
    }

  }

  pagar(invoice: InvoiceDto) {
    this.ref = this.dialogService.open(PaymentComponent, {
      header: 'Pagamento pix!',
      width: '50%',
      modal: true,
      closable: true,
      dismissableMask: true,
      data: {
        invoice: invoice,
        userId: this.userId
      }
    });

    this.ref.onClose.subscribe(() => {
      this.getUserById(this.userId);
    });
  }

  getUserById(userId: string) {
    this.loading = true;
    this.http.get<CustomResponse<UserFullDto>>(`https://localhost:7098/v1/users/${userId}`)
    .pipe(delay(5000))
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.messageService.add({ severity: 'Error', summary: 'Info', detail: 'Verifique o cpf informado' })
        }
      },
      error: (err) => {
        this.loading = false;
        this.router.navigate(['/']);
        this.messageService.add({ severity: 'error', summary: 'Info', detail: `Erro: ${err}` })
      }
    });
  }

  sair(){
    localStorage.removeItem("tokenPortal");
    this.router.navigate(['/']);
  }

}
