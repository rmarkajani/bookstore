import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
  },
];

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
})
export class BooksModule {}
