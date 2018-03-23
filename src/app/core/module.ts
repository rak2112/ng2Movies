import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EffectsModule } from '@ngrx/effects';

//import { ContextsModule } from '../contexts';

import { ErrorComponent } from './components/error-loader.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// import { LoaderComponent } from './components/loader/loader.component';

//import { CaseAccessibleGuard } from './guards/case-access';
// import { ConfirmDeactivateGuard } from './guards/confirm-deactivate';
// import { CaseDataGuard } from './guards/case-data';
// import { CaseExistsGuard } from './guards/case-exists';
// import { SuspectExistsGuard } from './guards/suspect-exists';
// import { ChargeExistsGuard } from './guards/charge-exists';
import { MovieService, UtilService, UINotification } from './services/index';
import { MoviesEffects } from './effects/movies.effects';
import { UserEffects } from './effects/user.effects';
//import { SessionInterceptor } from './interceptors/session';

import { SharedModule } from '../shared/common.module';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { AppComponent } from '../app.component';

// import { AllMovies } from '../movies/allMovies.component';
import { Home } from '../home/home.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { AuthService } from '../user/auth.service';
import { UserMoviesResolver } from '../user/userMoviesResolver';
import { AppCompResolver } from './services/appComponent.resolver';
import { UserMoviesExistsGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    EffectsModule.forFeature([MoviesEffects, UserEffects]),
    NgbModule.forRoot(),
    // CapabilitiesModule.forRoot({ manifestPath: './config/capabilities.json' }),
    RouterModule,
    SharedModule
  ],
  declarations: [
    ErrorComponent,
    //LoaderComponent,
    NavBarComponent,
    AppComponent,

    //AllMovies,
    Home,
    // MoviesPaginationComponent,
    MovieDetailsComponent,
  ],
  exports: [
    Home,
    ErrorComponent,
    //LoaderComponent,
    NavBarComponent
  ],
  providers: [MovieService, UtilService, AuthService, UserMoviesResolver, AppCompResolver, UINotification, UserMoviesExistsGuard],
})
export class CoreModule {

  // static forRoot(config): ModuleWithProviders {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       MovieService,
  //       UtilService,
  //       UINotification,
  //       AuthService
  //       // {
  //       //   provide: HTTP_INTERCEPTORS,
  //       //   useClass: SessionInterceptor,
  //       //   multi: true
  //       // },
  //       // // {
  //       // //   provide: APP_INITIALIZER,
  //       // //   useFactory: fetchCoreConfig,
  //       // //   deps: [CoreConfigService],
  //       // //   multi: true
  //       // // },
  //       // CaseAccessibleGuard,
  //       // CaseDataGuard,
  //       // CaseExistsGuard,
  //       // ChargeExistsGuard,
  //       // SuspectExistsGuard,
  //       // ConfirmDeactivateGuard
  //     ]
  //   };
  // }
}
