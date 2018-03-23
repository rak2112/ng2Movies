import { LoginContainer } from './login/login.container';
import { ProfileComponentContainer } from './profile/profile.container';
import { UserMoviesExistsGuard } from '../core/guards';

export const userRoutes = [
  {path: 'login', component: LoginContainer},
  {path: 'profile', component: ProfileComponentContainer, canActivate: [
		UserMoviesExistsGuard
	]}
];
