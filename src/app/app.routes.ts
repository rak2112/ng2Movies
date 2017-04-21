import { Routes } from '@angular/router';
import { AllMovies } from './movies/allMovies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { Home } from './home/home.component';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { AppCompResolver } from './shared/index';
console.log('user module', UserModule)
export const appRoutes: Routes = [
  {path: 'home', component: Home},
  {path: 'movies', component: AllMovies},
  {path: 'inCinemas', component: AllMovies},
  {path: 'popular', component: AllMovies},
  {path: 'upComing', component: AllMovies},
  {path: 'latest', component: AllMovies},
  {path: 'movieDetails/:id', component: MovieDetailsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: 'AppComponent', resolve: {}},
  // {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
