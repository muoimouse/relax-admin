import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LockedComponent } from './locked/locked.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { routing} from "./auth.routing";
import { AuthComponent } from './auth.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { LogoutComponent } from "./logout.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations:
  [
      LoginComponent, LogoutComponent, LockedComponent,
      RegisterComponent, ForgotComponent, AuthComponent
  ],
  providers : []
})
export class AuthModule { }
