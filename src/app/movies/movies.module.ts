import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMoviesContainer} from './container/allMovies.container';
import { AppMovies } from './components/movies.component';
//import { AllMoviesComponent} from './components/movies';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/common.module';


@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		SharedModule
  ],
  declarations: [
    AppMovies,
    AllMoviesContainer,
    //AllMoviesComponent
  ],
  exports: [
    AllMoviesContainer
  ]
})
export class AllMoviesModule { }
