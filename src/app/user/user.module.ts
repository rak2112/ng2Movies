
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import {Store, StoreModule} from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/loginForm.component';
import { ProfileComponent } from './profile/profile.component';
import { userRoutes } from './user.routes';
import { AuthService } from './auth.service';
import {movies, movieDetail, searchedMovies, authenticateUser} from './../reducers/movies.reducer';

import { SharedModule } from './../shared/common.module';

// import {
//
// } from './shared/index';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ProfileComponent
  ],
  imports: [
    //BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(userRoutes),
    //StoreModule.provideStore({router: routerReducer, movies, movieDetail, searchedMovies, authenticateUser}),
  ]
})
export class UserModule { }
