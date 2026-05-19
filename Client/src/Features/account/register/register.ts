import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../Core/Services/account-service';
import { RegisterCreds, User } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  accountService = inject(AccountService);
  @Output() cancelRegister = new EventEmitter<boolean>();
  creds: RegisterCreds = {
    email: '',
    displayName: '',
    password: '',
  };
  register() {
    this.accountService.register(this.creds).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
