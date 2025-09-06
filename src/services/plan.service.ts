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
import { UserSimpleDto } from "../dtos/user/user-simple.dto";
import { PlanDto } from "../dtos/plan/plan.dto";

@Injectable({ providedIn: 'root' })
export class PlanService {
    private readonly url = StorageKeys.URL_DEV;

    constructor(
        private readonly http: HttpClient
    ) { }

    getAllPlans(): Observable<CustomResponse<PlanDto[]>>{
        return this.http.get<CustomResponse<PlanDto[]>>(`${this.url}plans/get-all-plans`)
    }


}