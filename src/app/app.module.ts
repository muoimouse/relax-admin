import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routing";
import { AppService } from "./shared/app.service";
import { MyErrorHandler } from "./shared/error";
import {UploadService} from "./shared/upload/upload.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AppService, UploadService], //,{provide: ErrorHandler, useClass: MyErrorHandler}
  bootstrap: [AppComponent]
})
export class AppModule { }
