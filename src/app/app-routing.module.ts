import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from '../guards/admin.guard';
import { StorageKeys } from '../configs/config';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: "dashboard/users",
    title: "Gestão de Usuários",
    canActivate: [AdminGuard],
    data: { roles: [StorageKeys.ADMIN] },
    loadChildren: () => import('./dashboard/dasboard-admin/users/users.module')
      .then(m => m.UsersModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
