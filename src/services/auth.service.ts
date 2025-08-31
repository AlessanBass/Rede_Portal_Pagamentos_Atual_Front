import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as signalR from '@microsoft/signalr';
import { StorageKeys } from "../configs/config";
import { jwtDecode } from 'jwt-decode';
import { CustomResponse } from "../interfaces/custom-response.interface";
import { LoginResponse } from "../interfaces/login-response.interface";
import { HttpClient } from "@angular/common/http";
import { ClaimDto } from "../dtos/claims/claim.dto";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly tokenKey = StorageKeys.TOKEN;
    private readonly claims = StorageKeys.CLAIMS;
    private readonly url = StorageKeys.URL_DEV;

    constructor(private readonly http: HttpClient) { }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    setClaims(claims: ClaimDto[]) {
        const values = claims.map(c => c.value);
        localStorage.setItem(this.claims, JSON.stringify(values));
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    getDecodedToken(): any {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    }

    getUserId(): string | null {
        const decoded = this.getDecodedToken();
        if (!decoded) return null;

        return decoded['nameid'] || null;
    }

    getNameUser(): string {
        const decoded = this.getDecodedToken();
        if (!decoded) return '';

        return decoded['unique_name'] || null;
    }

    getUserRoles(): string[] {
        const decoded: any = this.getDecodedToken();
        if (!decoded) return [];

        const roles: string[] = [];

        // percorre todas as claims e pega todas as roles
        if (decoded.claims && Array.isArray(decoded.claims)) {
            decoded.claims.forEach((c: any) => {
                if (c.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role') {
                    roles.push(c.value);
                }
            });
        } else {
            // fallback: role direto no payload
            const singleRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (singleRole) {
                if (Array.isArray(singleRole)) return singleRole;
                roles.push(singleRole);
            }
        }

        return roles;
    }

    getClaims(): string[] {
        const data = localStorage.getItem(this.claims);
        return data ? JSON.parse(data) : [];
    }

    hasClaim(value: string): boolean {
        return this.getClaims().includes(value);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.claims);
    }

    hasRole(role: string): boolean {
        const roles = this.getUserRoles();
        console.log(roles);
        return roles.includes(role);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    login(cpf: string): Observable<CustomResponse<LoginResponse>> {
        return this.http.get<CustomResponse<LoginResponse>>(`${this.url}auth/login/${cpf}`);
    }
}