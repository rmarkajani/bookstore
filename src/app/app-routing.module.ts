import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
