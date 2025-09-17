import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubConnection: signalR.HubConnection;
    public paymentApproved$ = new Subject<any>();


    startConnection(token: string) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7098/paymentHub', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.start().then(() => console.log('SignalR conectado'))
            .catch(err => console.error(err));

        this.hubConnection.on('PaymentApproved', (data) => {
            this.paymentApproved$.next(data);
        });
    }
}