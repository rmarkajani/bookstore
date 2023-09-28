import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './main/components/components.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { stores } from './core/states';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UsersService } from './core/services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './core/services/books/book.service'; // Import the BookService


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    NgxsModule.forRoot(stores, {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HttpClientModule,
  ],
  providers: [UsersService, BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
