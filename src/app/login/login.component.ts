import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { AuthService } from '../../services/auth.service';
import { ClaimDto } from '../../dtos/claims/claim.dto';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  erro = false;
  claims: ClaimDto[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private readonly AuthService: AuthService,
    private readonly errorHandlerService: ErrorHandlerService
  ) {

    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required]]
    });
  }


  formularioValido() {
    return this.loginForm.valid;
  }
  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  login() {
    this.AuthService.login(this.loginForm.get('cpf')?.value).subscribe({
      next: (res) => {
        this.AuthService.setToken(res.data.token);
        this.claims = res.data.claims;
        this.AuthService.setClaims(this.claims);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.erro = true;
        this.errorHandlerService.handleError(err);
      }
    });
  }
}
