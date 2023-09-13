import { Component, Host, HostListener } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from 'src/app/core/stores/cart/cart.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Select(CartState.getCartQuantity) itemQty$!: Observable<number>

  profileDropdown: boolean = false;
  routes = [
    {
      title: 'Home',
      path: 'home',
    },
    {
      title: 'Books',
      path: 'books',
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

  ngOnInit() {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    if (event.code === 'Escape') {
      this.profileDropdown = false;
    }
  }
}
