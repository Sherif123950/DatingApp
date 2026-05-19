import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);
  currrentUser = signal<User | null>(null);
  login(creds: LoginCreds) {
    return this.httpClient.post<User>('https://localhost:7040/api/account/login', creds).pipe(
      tap((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.currrentUser.set(null);
  }
  register(creds: RegisterCreds) {
    return this.httpClient.post<User>('https://localhost:7040/api/account/register', creds).pipe(
      tap((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currrentUser.set(user);
  }
}
