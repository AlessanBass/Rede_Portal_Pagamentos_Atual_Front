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
import { UserService } from '../../services/user.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AuthService } from '../../services/auth.service';
import { StorageKeys } from '../../configs/config';

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
  userId: string | null;
  isAdmin: boolean = false;
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
      label: 'Abrir Chamado',
      icon: 'pi pi-megaphone',
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
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {
    this.items = [
      { label: 'Principal' },

    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getUser();
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
      this.getUser();
    });
  }

  getUser() {
    this.loading = true;

    this.userService.getUserById().subscribe({
      next: (res) => {
        this.user = res.data;
        this.loading = false;
        this.isAdmin = this.authService.hasClaim(StorageKeys.ADMIN);
      },
      error: (err) => {
        this.loading = false;
        this.errorHandlerService.handleError(err);
        this.router.navigate(['/']);
      }
    });
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
