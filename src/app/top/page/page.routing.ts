import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from "./not-found.component";
import {InvalidAuthComponent} from "./invalid-auth.component";

export const pageRoutes: Routes =
[
    {path: 'not-found',component: NotFoundComponent},
    {path: 'invalid-auth',component: InvalidAuthComponent}
];

export const PageRouting = RouterModule.forChild(pageRoutes);

