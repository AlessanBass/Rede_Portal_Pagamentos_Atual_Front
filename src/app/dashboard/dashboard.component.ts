import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
 data: any;
    constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    
  }

  ngOnInit(): void {
     const token = localStorage.getItem('tokenPortal');
     if(token){
       const decodedToken: any = jwtDecode(token);
       console.log(decodedToken);
       const userId = decodedToken.nameid;
       console.log(userId);

       this.http.get<CustomResponse<any>>(`https://localhost:7098/v1/users/${userId}`).subscribe({
             next: (res) =>{
               if(res.success){
                 console.log(res.data)
                 this.data = res.data;
               }else{
                 this.messageService.add({severity:'Error', summary: 'Info', detail: 'Verifique o cpf informado'})
               }
             },
             error: (err) =>{
              console.log("deu erro", err);
               this.router.navigate(['/']);
               this.messageService.add({severity:'error', summary: 'Info', detail: `Erro: ${err}`})
             }
           });
     }

  }

}
