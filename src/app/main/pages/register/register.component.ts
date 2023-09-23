import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userService = inject(UsersService);

  createUser() {
    const user: User = {
      name: 'Ricky',
      description: 'is awesome',
      title: 'da man'
    }
    this.userService.createUser(user);
  }
}
