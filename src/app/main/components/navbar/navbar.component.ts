import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
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
}
