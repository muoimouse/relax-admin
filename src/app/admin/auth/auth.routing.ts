import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {LockedComponent} from "./locked/locked.component";
import {LogoutComponent} from "./logout.component";

export const routes:Routes =
[
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: LogoutComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'forgot-password',component: ForgotComponent},
  {path: 'locked',component: LockedComponent}
];

export const routing = RouterModule.forChild(routes);
