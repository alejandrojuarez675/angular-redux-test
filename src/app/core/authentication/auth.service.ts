import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginResponse, ProfileResponse } from 'src/app/shared/models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.backendEndpoint + '/auth';

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<LoginResponse> {
    const body = { user, password };
    const url = `${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url, body);
  }

  getProfile(token: string): Observable<ProfileResponse> {
    const url = `${this.baseUrl}/user/${token}/profile`;
    return this.http.get<ProfileResponse>(url);
  }

  checkToken(token: string): Observable<boolean> {
    return this.getProfile(token).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
