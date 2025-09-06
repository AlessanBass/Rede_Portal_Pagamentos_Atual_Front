import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersAppComponent } from "./user.app.component";
import { ListaComponent } from "./lista/lista.component";
import { CadastroComponent } from "./cadastro/cadastro.component";

const routes: Routes = [
  {
    path: '', component: UsersAppComponent,
    children: [
      { path: '', component: ListaComponent },
      { path: 'cadastro', component: CadastroComponent, title: 'Cadastro novo usuário' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule{}