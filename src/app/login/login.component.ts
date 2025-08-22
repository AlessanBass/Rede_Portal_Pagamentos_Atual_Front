import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { LoginResponse } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  erro = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
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
    this.http.get<CustomResponse<LoginResponse>>(`https://localhost:7098/v1/auth/login/${this.loginForm.get('cpf')?.value}`).subscribe({
      next: (res) => {
        if (res.success) {
          console.log("sucesso");
          const token = res.data.token;
          localStorage.setItem('tokenPortal', token);
          this.router.navigate(['/dashboard']);
        } else {
          this.messageService.add({ severity: 'Error', summary: 'Info', detail: 'Verifique o cpf informado' })
        }
      },
      error: (err) => {
        console.log("deu erro", err);
        this.erro = true;
        this.messageService.add({ severity: 'error', summary: 'Info', detail: `Erro: ${err}` })
      }
    });
  }
}
