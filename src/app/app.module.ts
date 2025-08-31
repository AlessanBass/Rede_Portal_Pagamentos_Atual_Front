import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaymentComponent } from './dashboard/payment/payment.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { DasboardAdminComponent } from './dashboard/dasboard-admin/dasboard-admin.component';
import { UsersModule } from './dashboard/dasboard-admin/users/users.module';
import { CardComponent } from './card/card.component';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    PaymentComponent,
    NotFoundComponent,
    DasboardAdminComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    InputMaskModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    BreadcrumbModule,
    SplitButtonModule,
    CardModule,
    DialogModule,
    DynamicDialogModule,
    ClipboardModule,
    ProgressSpinnerModule,
    UsersModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
   
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
