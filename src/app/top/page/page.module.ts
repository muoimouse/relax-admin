import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRouting } from './page.routing';
import {NotFoundComponent} from "./not-found.component";
import {InvalidAuthComponent} from "./invalid-auth.component";

@NgModule({
  imports: [
    CommonModule,
    PageRouting
  ],
  declarations:
  [
    NotFoundComponent,
    InvalidAuthComponent
  ]
})
export class PageModule { }
