import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpInterceptorService } from './service/http/http-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './component/feed/feed.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserModalComponent } from './component/user-modal/user-modal.component';
import { PostModalComponent } from './component/post-modal/post-modal.component';
import { ManagePostsComponent } from './component/manage-posts/manage-posts.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { CreatePostFormComponent } from './component/create-post-form/create-post-form.component';
import { ModalComponent } from './shared/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainSearchbarComponent } from './component/main-searchbar/main-searchbar.component';
import { LoginHeadingComponent } from './component/login-heading/login-heading.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    UserModalComponent,
    PostModalComponent,
    ManagePostsComponent,
    ManageUsersComponent,
    CreatePostFormComponent,
    ModalComponent,
    MainSearchbarComponent,
    LoginHeadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
