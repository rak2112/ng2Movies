import { Routes } from '@angular/router';
import { AllMovies } from './../../movies/allMovies.component';
import { MovieDetailsComponent } from './../../movie-details/movie-details.component';
import { Home } from './../../home/home.component';
import { UserModule } from './../../user/user.module';
import { AppComponent } from './../../app.component';
import { AppCompResolver } from './../services/appComponent.resolver';

export const appRoutes: Routes = [
  {path: 'home', component: Home},
  {path: 'movies', component: AllMovies, resolve: {userMovies: AppCompResolver}},
  {path: 'inCinemas', component: AllMovies, resolve: {userMovies: AppCompResolver}},
  {path: 'popular', component: AllMovies, resolve: {userMovies: AppCompResolver}},
  {path: 'upComing', component: AllMovies, resolve: {userMovies: AppCompResolver}},
  {path: 'latest', component: AllMovies, resolve: {userMovies: AppCompResolver}},
  {path: 'movieDetails/:id', component: MovieDetailsComponent},
  {path: 'user', loadChildren: './../../user/user.module#UserModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
