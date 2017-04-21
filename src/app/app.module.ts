import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Store, StoreModule} from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/routes/app.routing.module';
import { AllMovies } from './movies/allMovies.component';
import { Home } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import {movies, movieDetail, searchedMovies, authenticateUser, userMovies} from './reducers/movies.reducer';
import { AuthService } from './user/auth.service';
import { UserMoviesResolver } from './user/userMoviesResolver';
import { AppCompResolver } from './shared/services/appComponent.resolver';

import { SharedModule } from './shared/common.module';
//import { UtilService, MovieService, ModalComponent, NavBarComponent} from './shared/index';
import {
  MovieService,
  UtilService,
  LoaderComponent,
  ErrorComponent,
  ModalComponent,
  NavBarComponent,
  FilterComponent,
  MultiSelectComponent,
  ModalTriggerDirective,
  NameInitialsPipe
} from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    AllMovies,
    Home,
    LoaderComponent,
    ErrorComponent,
    // MoviesPaginationComponent,
    MovieDetailsComponent,
    ModalComponent,
    ModalTriggerDirective,
    FilterComponent,
    MultiSelectComponent,
    NameInitialsPipe,
    NavBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({movies, movieDetail, searchedMovies, authenticateUser, userMovies}),
  ],
  entryComponents: [ModalComponent],
  providers: [MovieService, UtilService, AuthService, UserMoviesResolver, AppCompResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
