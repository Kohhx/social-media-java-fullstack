import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FeedComponent } from './component/feed/feed.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { userguardGuard } from './guards/userguard.guard';
import { adminguardGuard } from './guards/adminguard.guard';
import { loginguardGuard } from './guards/loginguard.guard';
import { ManagePostsComponent } from './component/manage-posts/manage-posts.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[loginguardGuard] },
  { path: 'signup', component: RegisterComponent, canActivate:[loginguardGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: NavbarComponent, children: [
    { path: 'posts', component: FeedComponent, canActivate: [userguardGuard] },
    { path: 'users/:id/posts', component: ProfileComponent },
    { path: 'admin/posts', component: ManagePostsComponent, canActivate: [userguardGuard] },
    { path: 'admin/users', component: ManageUsersComponent, canActivate: [userguardGuard] },
  ] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
