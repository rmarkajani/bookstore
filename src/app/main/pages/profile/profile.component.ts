import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userService = inject(UsersService);
  ngOnInit() {
    const users = this.userService.getUsers();
    console.log(users);
  }
}
