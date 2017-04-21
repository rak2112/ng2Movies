
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
//import { Tab, Tabs, MovieListComponent, MovieComponent, } from './index';
import {
  LoaderComponent,
  ErrorComponent,
  Tab,
  Tabs,
  //NavBarComponent,
  FilterComponent,
  MovieComponent,
  MovieListComponent,
  MultiSelectComponent,
  MoviesPaginationComponent,
  ModalTriggerDirective,
  NameInitialsPipe
} from './index';

// import {
//
// } from './shared/index';

@NgModule({
  declarations: [
    Tab,
    Tabs,
    MovieComponent,
    MovieListComponent,
    MoviesPaginationComponent
  ],
  imports: [
    //BrowserModule,
    CommonModule,
    // FormsModule,
    HttpModule,
    RouterModule,
    NgbModule.forRoot(),
    //StoreModule.provideStore({router: routerReducer, movies, movieDetail, searchedMovies, authenticateUser}),
  ],
  exports:[
    // BrowserModule,
    // CommonModule,
    // FormsModule,
    Tab,
    Tabs,
    MovieComponent,
    MovieListComponent,
    MoviesPaginationComponent
  ]
})
export class SharedModule { }
