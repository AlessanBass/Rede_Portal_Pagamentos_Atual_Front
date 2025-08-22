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

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  items: MenuItem[];
  home: MenuItem
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
      },
    }
  ];

  user: UserFullDto;

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
    private messageService: MessageService
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
      console.log(decodedToken);
      const userId = decodedToken.nameid;
      console.log(userId);

      this.http.get<CustomResponse<UserFullDto>>(`https://localhost:7098/v1/users/${userId}`).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res.data)
            this.user = res.data;
          } else {
            this.messageService.add({ severity: 'Error', summary: 'Info', detail: 'Verifique o cpf informado' })
          }
        },
        error: (err) => {
          console.log("deu erro", err);
          this.router.navigate(['/']);
          this.messageService.add({ severity: 'error', summary: 'Info', detail: `Erro: ${err}` })
        }
      });
    }

  }

}
