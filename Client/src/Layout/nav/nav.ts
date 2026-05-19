import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Core/Services/account-service';
import { LoginCreds } from '../../types/user';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: LoginCreds = {
    email: '',
    password: '',
  };
  protected acccountService = inject(AccountService);
  protected currentUser = this.acccountService.currrentUser;
  login() {
    console.log(this.creds);
    this.acccountService.login(this.creds).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
  logout(){
    this.acccountService.logout();
  }
}
