import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AllMovies } from './../app/movies/allMovies.component';
import { Home } from './home/home.component';

import { MovieService } from './../app/services/movie.service';
import { UtilService } from './services/util.service';

import { MoviesPaginationComponent } from './shared/movies-pagination/movies-pagination.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';
import { MovieComponent } from './shared/movie/movie.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ErrorComponent } from './shared/error-loader/error-loader.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ModalComponent } from './shared/modal/modal.component';
import { FilterComponent } from './shared/filters-component/filters.component';
import { MultiSelectComponent } from './shared/multi-select/multi-select.component';


import { NameInitialsPipe } from './filters/name-initials.pipe.ts';

import {movieReducer, movieDetailReducer} from './reducers/movies.reducer'
import {Store, StoreModule} from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    AllMovies,
    Home,
    LoaderComponent,
    ErrorComponent,
    MoviesPaginationComponent,
    MovieListComponent,
    MovieComponent,
    MovieDetailsComponent,
    ModalComponent,
    FilterComponent,
    MultiSelectComponent,
    NameInitialsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({movieReducer, movieDetailReducer}),
    RouterModule.forRoot([
      {path: 'home', component: Home},
      {path: 'movies', component: AllMovies},
      {path: 'inCinemas', component: AllMovies},
      {path: 'popular', component: AllMovies},
      {path: 'upComing', component: AllMovies},
      {path: 'latest', component: AllMovies},
      {path: 'movieDetails/:id', component: MovieDetailsComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  entryComponents: [ModalComponent],
  providers: [MovieService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
