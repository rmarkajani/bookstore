import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
  userService = inject(UsersService);
  fb = inject(FormBuilder)
  profileForm = this.fb.group({
    email: '',
    password: ''
  });
  createUser() {
    if(!this.profileForm.value)return
    const user: any = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
    }
    this.userService.createUser(user);
  }

}
