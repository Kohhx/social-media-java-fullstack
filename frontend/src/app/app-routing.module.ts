import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FeedComponent } from './component/feed/feed.component';
import { RegisterComponent } from './component/register/register.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { userguardGuard } from './guards/userguard.guard';
import { adminguardGuard } from './guards/adminguard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: NavbarComponent, children: [
    { path: 'feed', component: FeedComponent, canActivate: [userguardGuard] },
  ] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
