import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import {HomeComponent} from "./home.component";
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
