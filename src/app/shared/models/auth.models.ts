export interface LoginRequest {
  user: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ProfileResponse {
  user: string;
  age: number;
}
