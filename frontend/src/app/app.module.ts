import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { EventPageComponent } from './components/pages/event-page/event-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TitleComponent } from './components/partials/title/title.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { GroupPageComponent } from './components/pages/group-page/group-page.component';
import { FooterPageComponent } from './components/partials/footer-page/footer-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { TeamPageComponent } from './components/pages/team-page/team-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { PaidComponent } from './components/pages/paid/paid.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { WorkshopComponent } from './components/pages/workshop/workshop.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomeComponent,
    EventPageComponent,
    CartPageComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent,
    OrderItemsListComponent,
    CheckoutPageComponent,
    TitleComponent,
    PaymentPageComponent,
    GroupPageComponent,
    FooterPageComponent,
    RegisterPageComponent,
    DefaultButtonComponent,
    TeamPageComponent,
    AdminPageComponent,
    PaidComponent,
    ProfileComponent,
    WorkshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:4000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
