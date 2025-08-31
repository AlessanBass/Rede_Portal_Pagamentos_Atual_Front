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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from '../../../footer/footer.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SharedModule } from '../../../shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../../../interceptors/auth.interceptor';

@NgModule({
  declarations: [
    UsersAppComponent,
    ListaComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    BreadcrumbModule,
    DialogModule,
    DynamicDialogModule,
    SplitButtonModule,
    TableModule,
    ProgressSpinnerModule,
    SharedModule
  ]
  
})
export class UsersModule { }
