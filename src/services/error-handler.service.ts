import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as signalR from '@microsoft/signalr';
import { StorageKeys } from "../configs/config";
import { jwtDecode } from 'jwt-decode';
import { MessageService } from "primeng/api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

    constructor(
        private readonly messageService: MessageService
    ) {

    }

    handleError(error: HttpErrorResponse) {
        if (!error.status || error.status === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro de conexão',
                detail: 'Não foi possível conectar ao servidor. Verifique se ele está online ou tente novamente mais tarde!'
            });
            return;
        }

        switch (error.status) {
            case 400:
                // Bad Request - exibe todos os erros retornados pelo backend
                if (error.error?.errors && Array.isArray(error.error.errors)) {
                    error.error.errors.forEach((err: any) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro 400',
                            detail: err.value
                        });
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro 400',
                        detail: error.error?.message || 'Requisição inválida.'
                    });
                }
                break;

            case 401:
                // Não autorizado
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Não autorizado',
                    detail: 'Você precisa se autenticar para acessar este recurso.'
                });
                break;

            case 403:
                // Proibido
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Proibido',
                    detail: 'Você não tem permissão para acessar este recurso.'
                });
                break;

            case 404:
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Não encontrado',
                    detail: 'O recurso solicitado não foi encontrado.'
                });
                break;

            case 500:
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro do servidor',
                    detail: 'Ocorreu um erro no servidor. Tente novamente mais tarde.'
                });
                break;

            default:
                this.messageService.add({
                    severity: 'error',
                    summary: `Erro ${error.status}`,
                    detail: error.error?.message || error.message || 'Ocorreu um erro inesperado.'
                });
                break;
        }
    }
}