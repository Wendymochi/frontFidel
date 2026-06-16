import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginDto } from '@data/dto/login.dto';
import { LoginResponse } from '@data/interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {

  private readonly http = inject(HttpClient);

  login(dto: LoginDto): Observable<LoginResponse> {

    const body = new URLSearchParams();

    body.set('username', dto.username);
    body.set('password', dto.password);

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

  }

}