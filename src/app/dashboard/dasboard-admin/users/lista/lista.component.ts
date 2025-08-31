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

  user: UserFullDto;
  users: UserFullDto[] = [];
  userTotal: number = 0;
  parameters: FilteredPagedListParameters = {
    search: '',
    sort: 'name',
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
  /*   const rows = event.rows ?? 10;
    const first = event.first ?? 0; */
    
   /*  this.parameters = {
      pageSize: rows,
      currentPage: Math.floor(first / rows) + 1,
      sort: Array.isArray(event.sortField)
        ? event.sortField[0]
        : (event.sortField ?? ''),
      order: event.sortOrder === 1 ? 'asc' : 'desc',
    }; */

    this.getUsers(this.parameters);
  }

  getUsers(parameters: FilteredPagedListParameters) {
    // colcoar um loading
    this.userService.getPagedList(this.parameters).subscribe({
      next: (res) => {
        this.userTotal = res.data.pagingInformation.totalCount;
        this.users = res.data.items;
        console.log(this.users);
        // final do loading
      },
      error: (err) => {
        this.handlerError.handleError(err);
        // final do loading
      }
    });
  }
}
