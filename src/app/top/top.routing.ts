import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout.component";

const topRoutes: Routes =
[
  {
    path: '',
    component: DefaultLayoutComponent,
    children:
    [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/top/home/home.module#HomeModule' },
      { path: 'page', loadChildren: 'app/top/page/page.module#PageModule' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(topRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TopRoutingModule {}
