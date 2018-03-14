import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {AuthGuard} from "../shared/guards/auth-guard";

const adminRoutes: Routes =
[
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: MainLayoutComponent,
    children:
    [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/admin/home/home.module#HomeModule' },
      { path: 'user', loadChildren: 'app/admin/users/user.module#UserModule' },
      { path: 'password', loadChildren: 'app/admin/users/password/password.module#PasswordModule' },
      { path: 'profile', loadChildren: 'app/admin/users/profile/profile.module#ProfileModule' },
      { path: 'tmp-test-type', loadChildren: 'app/admin/test/test-type/test-type.module#TestTypeModule' },
      { path: 'tmp-test-type/**', redirectTo: 'tmp-test-type' },
      { path: 'tmp-test', loadChildren: 'app/admin/test/test/test.module#TestModule' },
      { path: 'tmp-test/**', redirectTo: 'tmp-test' }
    ]
  },
  { path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/admin/auth/auth.module#AuthModule'},
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
