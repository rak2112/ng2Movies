
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import {Store, StoreModule} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { LoginContainer } from './login/login.container';
import { LoginFormComponent } from './login/loginForm.component';
import { ProfileComponentContainer } from './profile/profile.container';
import { ProfileComponent } from './profile/profile.component';
import { userRoutes } from './user.routes';
import { AuthService } from './auth.service';
//import {movies, movieDetail, searchedMovies, authenticateUser} from './../reducers/movies.reducer';

import { SharedModule } from './../shared/common.module';

// import {
//
// } from './shared/index';

@NgModule({
  declarations: [
    LoginContainer,
		LoginFormComponent,
		ProfileComponentContainer,
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
