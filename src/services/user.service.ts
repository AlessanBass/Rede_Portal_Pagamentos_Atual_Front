import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as signalR from '@microsoft/signalr';
import { StorageKeys } from "../configs/config";
import { jwtDecode } from 'jwt-decode';
import { CustomResponse } from "../interfaces/custom-response.interface";
import { LoginResponse } from "../interfaces/login-response.interface";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UserFullDto } from "../dtos/user/user-full.dto";
import { FilteredPagedListParameters } from "../dtos/pagedlist/filtered-paged-list-parameters";
import { PagedListResponse } from "../interfaces/paged-list-response";

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly url = StorageKeys.URL_DEV;

    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService,
    ) { }

    getUserById(): Observable<CustomResponse<UserFullDto>> {
        const userId = this.authService.getUserId();

        return this.http.get<CustomResponse<UserFullDto>>(`${this.url}users/${userId}`);
    }

    getPagedList(parameters: FilteredPagedListParameters): Observable<CustomResponse<PagedListResponse<UserFullDto>>>{
        return this.http.get<CustomResponse<PagedListResponse<UserFullDto>>>(`${this.url}users/`, {
            params: {...parameters}
        })
    }


}