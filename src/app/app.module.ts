import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import {Store, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers, metaReducers, State } from './core/reducers';
import { AppRoutingModule } from './shared/routes/app.routing.module';
//import { AllMovies } from './movies/allMovies.component';
import { Home } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

//import {movies, movieDetail, searchedMovies, authenticateUser, userMovies} from './core/reducers';
import { AuthService } from './user/auth.service';
import { UserMoviesResolver } from './user/userMoviesResolver';
//import { AppCompResolver } from './shared/services/appComponent.resolver';

import { SharedModule } from './shared/common.module';
import { CoreModule } from './core/module';
import { MovieService, UtilService, UINotification } from './core/services/index';
import { AppCompResolver } from './core/services/appComponent.resolver';
import { AllMoviesModule } from './movies/movies.module';
import { ModalComponent } from './shared/modal/modal.component';
// import {
//   ModalTriggerDirective,
//   NameInitialsPipe,
// } from './shared/index';
//import {MultiSelectComponent } from './shared/multi-select/multi-select.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
		SharedModule,
		AllMoviesModule,
		NgbModule.forRoot(),
		StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
    //StoreModule.forRoot({movies, movieDetail, searchedMovies, authenticateUser, userMovies}),
  ],
  entryComponents: [ModalComponent],
  //providers: [MovieService, UtilService, AuthService, UserMoviesResolver, AppCompResolver, UINotification],
  bootstrap: [AppComponent]
})
export class AppModule { }
