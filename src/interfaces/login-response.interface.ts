
export interface LoginResponse {
  token: string;
  expiresIn: number;
  claims: any[];
}