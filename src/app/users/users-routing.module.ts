import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCurdComponent } from './user-curd/user-curd.component';

const routes: Routes = [
  { path: '', component: UserCurdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
 }
