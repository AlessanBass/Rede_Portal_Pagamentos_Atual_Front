import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserFullDto } from '../../../../../dtos/user/user-full.dto';
import { FilteredPagedListParameters } from '../../../../../dtos/pagedlist/filtered-paged-list-parameters';
import { UserService } from '../../../../../services/user.service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { UserSimpleDto } from '../../../../../dtos/user/user-simple.dto';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {
  ref: DynamicDialogRef;
  items: MenuItem[];
  home: MenuItem;
  loading: boolean = true;
  nameUser: string = '';
  search: string = '';

  user: UserSimpleDto;
  users: UserSimpleDto[] = [];
  userTotal: number = 0;
  parameters: FilteredPagedListParameters = {
    search: '',
    sort: 'cpf',
    order: "asc"
  }

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
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly handlerError: ErrorHandlerService,
    private readonly router: Router
  ) {
    this.items = [
      { label: 'Principal', routerLink: '/dashboard' },
      { label: 'Usuários' },

    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  ngOnInit(): void {
    this.nameUser = this.authService.getNameUser();
    this.getUsers(this.parameters);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  paginate(event: TableLazyLoadEvent) {
     this.parameters.pageSize = event.rows!;
     this.parameters.currentPage = event.first! / event.rows! + 1;
     this.parameters.sort = Array.isArray(event.sortField)
        ? event.sortField[0]
        : (event.sortField ?? '');
     this.parameters.order = event.sortOrder == 1 ? "asc" : "desc";

    this.getUsers(this.parameters);
  }

  getUsers(parameters: FilteredPagedListParameters) {
    this.userService.getSimplePagedList(this.parameters).subscribe({
      next: (res) => {
        this.userTotal = res.data.pagingInformation.totalCount;
        this.users = res.data.items;
        this.loading = false;
      },
      error: (err) => {
        this.handlerError.handleError(err);
        this.loading = false;
      }
    });
  }

  clear(){
    this.search = '';
    this.parameters.search = this.search;

    this.getUsers(this.parameters);
  }

  searchUser(){
    if(this.search !== '' || this.search !== null || this.search !== undefined){
      this.parameters.search = this.search;

      this.getUsers(this.parameters);
    }
  }
}
