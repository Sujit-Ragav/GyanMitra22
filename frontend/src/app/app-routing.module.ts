import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { EventPageComponent } from './components/pages/event-page/event-page.component';
import { GroupPageComponent } from './components/pages/group-page/group-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PaidComponent } from './components/pages/paid/paid.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { TeamPageComponent } from './components/pages/team-page/team-page.component';
import { WorkshopComponent } from './components/pages/workshop/workshop.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'',component:GroupPageComponent},
  {path:'group/:groupname',component:HomeComponent},
  {path:'event/:id',component:EventPageComponent},
  {path:'cart-page',component:CartPageComponent,canActivate:[AuthGuard]},
  {path:'checkout', component: CheckoutPageComponent,canActivate:[AuthGuard]},
  {path:'payment', component: PaymentPageComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterPageComponent},
  {path:'teampage/:id',component:TeamPageComponent,canActivate:[AuthGuard]},
  {path: "paid", component:PaidComponent,canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"admin",component:AdminPageComponent,canActivate:[AuthGuard]},
  {path:"workshop",component:WorkshopComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
