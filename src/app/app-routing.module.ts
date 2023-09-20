import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './main/pages/checkout/checkout.component';
import { ConfirmationComponent } from './main/pages/confirmation/confirmation.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./main/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./main/pages/books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./main/pages/about-us/about-us.module').then(
        (m) => m.AboutUsModule
      ),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./main/pages/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./main/pages/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./main/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./main/pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'confirmation', component: ConfirmationComponent
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./main/pages/register/register.module').then((m) => m.RegisterModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
