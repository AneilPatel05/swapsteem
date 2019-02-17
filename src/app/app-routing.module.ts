import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostTradeComponent } from './post-trade/post-trade.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SteemconnectRedirectGuard } from './redirect/steemconnect-redirect.guard';
import { PurchaseComponent } from './purchase/purchase.component';
import { RedirectComponent } from './redirect/redirect.component';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { HelppageComponent } from './helppage/helppage.component'
import {SignupstatusComponent} from './components/signupstatus/signupstatus.component';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'market/:market', component: HomeComponent },
  { path: 'help', component: HelppageComponent },
  {
    path: 'post-trade',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: PostTradeComponent
      },
      {
        path: '',
        component: PostTradeComponent
      },
    ]
  },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'purchase/:id', component: PurchaseComponent, canActivate: [AuthGuard] },
  {
    path: 'steemconnect/redirect',
    canActivate: [SteemconnectRedirectGuard],
    component: RedirectComponent
  },
  { path: 'order/:id', component: OrderComponent, canActivate: [AuthGuard] },
  {
    path: 'steemconnect/signup/success', component: SignupstatusComponent
  },
  {
    path: 'steemconnect/signup/failure', component: SignupstatusComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];;

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
