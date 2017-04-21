import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserMoviesResolver } from './userMoviesResolver';

export const userRoutes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, resolve: {userMovies: UserMoviesResolver}}
];
