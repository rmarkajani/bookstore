import { Component, Host, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  profileDropdown: boolean = false;
  routes = [
    {
      title: 'Home',
      path: 'home',
    },
    {
      title: 'Categories',
      path: 'categories',
    },
    {
      title: 'About Us',
      path: 'about-us',
    },
    {
      title: 'Contact Us',
      path: 'contact-us',
    },
  ];

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    if (event.code === 'Escape') {
      this.profileDropdown = false;
    }
  }
}
