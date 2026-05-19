import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../Layout/nav/nav';
import { AccountService } from '../Core/Services/account-service';
import { Home } from "../Features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected accountService = inject(AccountService);
  protected readonly title = signal('Client');
  protected members = signal<User[]>([]);
  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }
  setCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) return;
    this.accountService.currrentUser.set(JSON.parse(user));
  }
  async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:7040/api/members'));
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }
}
