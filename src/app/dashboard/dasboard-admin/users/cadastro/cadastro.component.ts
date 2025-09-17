import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../../services/auth.service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { UserService } from '../../../../../services/user.service';
import { PlanService } from '../../../../../services/plan.service';
import { PlanDto } from '../../../../../dtos/plan/plan.dto';
import { UserCreateDto } from '../../../../../dtos/user/user-create.dto';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  ref: DynamicDialogRef;
  createForm: FormGroup;

  plans: PlanDto[] = [];
  items: MenuItem[];
  home: MenuItem;
  loading: boolean = true;
  nameUser: string = '';
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
    private fb: FormBuilder,
    private router: Router,
    private readonly authService: AuthService,
    private readonly planService: PlanService,
    private readonly userService: UserService,
    private readonly errorHandlerService: ErrorHandlerService,
    private messageService: MessageService
  ) {
    this.items = [
      { label: 'Principal', routerLink: '/dashboard' },
      { label: 'Usuários', routerLink: '/dashboard/users' },
      { label: 'Cadastro de novo usuário' },

    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.createForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), this.cpfValidator]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.emailValidator]],
      phoneNumber: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      whatsApp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      dateOfBirth: ['', [Validators.required]],
      planId: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      neighborhood: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      cep: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      number: ['', [Validators.maxLength(5)]],
      reference: ['', [Validators.maxLength(50)]],
    });
  }

  errorMessages: Record<string, Record<string, string>> = {
    firstName: {
      required: "O nome é obrigatório",
      minlength: "O nome deve ter no mínimo 2 caracteres",
      maxlength: "O nome pode ter no máximo 100 caracteres"
    },
    lastName: {
      required: "O sobrenome é obrigatório",
      minlength: "O sobrenome deve ter no mínimo 2 caracteres",
      maxlength: "O sobrenome pode ter no máximo 100 caracteres"
    },
    cpf: {
      required: "O CPF é obrigatório",
      minlength: "O CPF está incompleto",
      maxlength: "O CPF está inválido",
      invalidCpf: "CPF inválido"
    },
    email: {
      required: "O email é obrigatório",
      minlength: "O email deve ter no mínimo 2 caracteres",
      maxlength: "O email pode ter no máximo 100 caracteres",
      invalidEmail: "Email inválido"
    },
    phoneNumber: {
      minlength: "O telefone deve ter no mínimo 2 caracteres",
      maxlength: "O telefone pode ter no máximo 20 caracteres",
    },
    whatsApp: {
      required: "O WhatsApp é obrigatório",
      minlength: "O WhatsApp deve ter no mínimo 2 caracteres",
      maxlength: "O WhatsApp pode ter no máximo 100 caracteres",
    },
    dateOfBirth: {
      required: "A data de nascimento é obrigatória",
    },
    planId: {
      required: "Um plano precisa ser escolihdo",
    },
    street: {
      required: "A rua é obrigatória",
      minlength: "A rua deve ter no mínimo 2 caracteres",
      maxlength: "A rua pode ter no máximo 100 caracteres"
    },
    neighborhood: {
      required: "O Bairro é obrigatório",
      minlength: "O Bairro deve ter no mínimo 2 caracteres",
      maxlength: "O Bairro pode ter no máximo 100 caracteres"
    },
    city: {
      required: "A cidade é obrigatória",
      minlength: "A cidade deve ter no mínimo 2 caracteres",
      maxlength: "A cidade pode ter no máximo 100 caracteres"
    },
    number: {
      maxlength: "O Número pode ter no máximo 5 caracteres"
    },
    cep: {
      required: "O CEP é obrigatório",
      minlength: "O CEP deve ter no mínimo 10 caracteres",
      maxlength: "O CEP pode ter no máximo 10 caracteres"
    },
    reference: {
      minlength: "A Referência deve ter no mínimo 10 caracteres",
      maxlength: "A Referência pode ter no máximo 10 caracteres"
    }
  }

  ngOnInit(): void {
    this.nameUser = this.authService.getNameUser();
    this.getPlans();
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^[a-zA-Z0-9._]{2,100}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) ? null : { invalidEmail: true };
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(value) ? null : { invalidCpf: true };
  }

  formIsValid() {
    return this.createForm.valid;
  }

  cadastrar() {
    if (this.createForm.valid && this.createForm.dirty) {
      const formValue = this.createForm.value;

      const userDto: UserCreateDto = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        cpf: formValue.cpf,
        email: formValue.email,
        planId: formValue.planId.id,
        phoneNumber: formValue.phoneNumber || null,
        whatsApp: formValue.whatsApp,
        dateOfBirth: formValue.dateOfBirth,
        address: {
          street: formValue.street,
          number: formValue.number || null,
          city: formValue.city,
          cep: formValue.cep,
          reference: formValue.reference || null,
          neighborhood: formValue.neighborhood || null

        }
      }

      this.userService.create(userDto).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Info',
            detail: 'Cadastro efeituado com sucesso!'
          });

          this.router.navigate(['/dashboard/users'])
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        }
      });
    }
  }

  getPlans() {
    this.planService.getAllPlans().subscribe({
      // adiconar um loading
      next: (res) => {
        this.plans = res.data;
      },
      error: (err) => {
        this.errorHandlerService.handleError(err);
      }
    });
  }

  getFormErrors(field: string): string[] {
    const control = this.createForm.get(field);
    if (!control || !control.errors || !control.touched) return [];

    return Object.keys(control.errors)
      .map(errorKey => this.errorMessages[field]?.[errorKey])
      .filter((msg): msg is string => !!msg);// remove undefined
  }

}
