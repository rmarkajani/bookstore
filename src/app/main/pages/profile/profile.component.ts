import { Component, inject } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userService = inject(UsersService);
  user: any;
  ngOnInit() {
    this.loadUser()
  }

  async loadUser() {
    this.user = await lastValueFrom(
      this.userService.getUser('650e41f06c2954a9a99893e5')
    );
  }
}
