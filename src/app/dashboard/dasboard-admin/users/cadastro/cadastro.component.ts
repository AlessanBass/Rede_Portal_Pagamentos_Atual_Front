import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../../services/auth.service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  ref: DynamicDialogRef;
  items: MenuItem[];
  home: MenuItem;
  loading: boolean = true;
  nameUser: string = '';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly errorHandlerService: ErrorHandlerService,
    private messageService: MessageService
  ) {
    this.items = [
      { label: 'Principal', routerLink: '/dashboard' },
      { label: 'Usuários', routerLink: '/dashboard/users' },
      { label: 'Cadastro de novo usuário' },

    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnInit(): void {
    this.nameUser = this.authService.getNameUser();
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
