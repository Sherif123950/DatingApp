import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http=inject(HttpClient);
  protected readonly title = signal('Client');
  protected members = signal<any>([]);
async ngOnInit() {
  this.members.set(await this.getMembers());
  }
  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:7040/api/members'))
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
 }
}
