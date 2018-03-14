import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvService } from "./shared/env.service";

const appRoutes: Routes =
[
  {path: '', loadChildren: 'app/top/top.module#TopModule',data:{pageTitle: 'Top Module',resolve: {EnvService}}},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule',data:{pageTitle: 'Admin Module',resolve: {EnvService}}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EnvService
  ]
})
export class AppRoutingModule {}
