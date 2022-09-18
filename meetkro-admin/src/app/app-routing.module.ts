import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, NoAuthGuardService } from './core';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', canActivate: [NoAuthGuardService], data: { header: false }, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'forget-password', canActivate: [NoAuthGuardService], loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'reset-password/:token', canActivate: [NoAuthGuardService], loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'contact-us', canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'users',canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'meetings-management',canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./payment-mgmnt/payment-mgmnt.module').then(m => m.PaymentMgmntModule) },
  { path: 'slots-management',canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./event-mgmnt/event-mgmnt.module').then(m => m.EventMgmntModule) },
  { path: 'application-mgmnt',canActivate: [AuthGuardService], data: { header: true }, loadChildren: () => import('./application-mgmnt/application-mgmnt.module').then(m => m.ApplicationMgmntModule) },
  { path: 'feedbacks',canActivate: [AuthGuardService],data: { header: true }, loadChildren: () => import('./feedbacks/feedbacks.module').then(m => m.FeedbacksModule) },
  // { path: 'content-mgmnt', loadChildren: () => import('./content-mgmnt/content-mgmnt.module').then(m => m.ContentMgmntModule) },
  { path: 'content-mgmnt',canActivate: [AuthGuardService], loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
