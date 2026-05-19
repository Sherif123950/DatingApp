import { Component, Input, input, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 registerMode =signal(false);
 @Input({required: true})  membersFromApp:User[] = [];
  showRegister(mode: boolean) {
    this.registerMode.set(mode);
  }
}
