import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersAppComponent } from './user.app.component';
import { ListaComponent } from './lista/lista.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UsersAppComponent,
    ListaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UsersModule { }
