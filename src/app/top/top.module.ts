import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRoutingModule } from "./top.routing";
import { DefaultLayoutComponent } from "./layouts/default-layout.component";
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TopRoutingModule,
    FormsModule
  ],
  declarations: [DefaultLayoutComponent]
})
export class TopModule { }
