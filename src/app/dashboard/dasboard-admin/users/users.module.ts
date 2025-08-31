import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersAppComponent } from './user.app.component';
import { ListaComponent } from './lista/lista.component';
import { UserRoutingModule } from './user-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UsersAppComponent,
    ListaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    BreadcrumbModule,
    DialogModule,
    DynamicDialogModule,
    SplitButtonModule,
    TableModule
  ]
})
export class UsersModule { }
