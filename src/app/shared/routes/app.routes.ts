import { Routes } from '@angular/router';
import { AllMoviesContainer } from './../../movies/container/allMovies.container';
import { MovieDetailsComponent } from './../../movie-details/movie-details.component';
import { Home } from './../../home/home.component';
import { UserModule } from './../../user/user.module';
import { AppComponent } from './../../app.component';
import { AppCompResolver } from '../../core/services/appComponent.resolver';
import { UserMoviesExistsGuard } from '../../core/guards';

export const appRoutes: Routes = [
  {path: 'home', component: Home},
  {path: 'movies', component: AllMoviesContainer, canActivate: [
		UserMoviesExistsGuard
	] },
  {path: 'inCinemas', component: AllMoviesContainer },
  {path: 'popular', component: AllMoviesContainer },
  {path: 'upComing', component: AllMoviesContainer },
	{path: 'latest', component: AllMoviesContainer },
  {path: 'movieDetails/:id', component: MovieDetailsComponent },
  {path: 'user', loadChildren: './../../user/user.module#UserModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
