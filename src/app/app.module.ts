import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { CardCoffeeComponent } from './components/card-coffee/card-coffee.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, CardCoffeeComponent, CheckoutComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
