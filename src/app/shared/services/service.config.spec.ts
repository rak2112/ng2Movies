import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection} from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions } from '@angular/http';

export const configTestBed = (service) => {
  return TestBed.configureTestingModule({
    providers: [
      service,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
        deps: [ MockBackend, BaseRequestOptions ]
      }
    ]
  });
};

export class ResponseError extends Error {
  status: number
  statusText: string
}
export const getUrls = (...settings: any[]):any[] =>{
  let [pageNo, url, nextUrl, imgUrl, castUrl] = settings;
  let urls = {
    allMovies: `https://api.themoviedb.org/3/discover/movie?api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`,
    popularMovies: `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`,
    getUpComingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`,
    getInCinemas: `https://api.themoviedb.org/3/movie/now_playing?api_key=60773f18ef6a7a9ee3d4a640fab964eb&language=en-US&page=${pageNo}`,
    getLatestMovies: `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=05-05-2017&primary_release_date.lte=05-04-2017&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`,
    genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=60773f18ef6a7a9ee3d4a640fab964eb`,
    movieDetail: `https://api.themoviedb.org/3/movie/${pageNo}?api_key=60773f18ef6a7a9ee3d4a640fab964eb`,
    videos: `https://api.themoviedb.org/3/movie/${pageNo}/videos?api_key=60773f18ef6a7a9ee3d4a640fab964eb`,
    images: `https://api.themoviedb.org/3/movie/${pageNo}/images?api_key=60773f18ef6a7a9ee3d4a640fab964eb`,
    casts: `https://api.themoviedb.org/3/movie/${pageNo}/casts?api_key=60773f18ef6a7a9ee3d4a640fab964eb`
  }
  return [urls[url], urls[nextUrl], urls[imgUrl], urls[castUrl]];
};

export const getAuthUserUrls = (...settings: any[]):any[] => {
  let [data, url1, url2, url3, url4] = settings;
  let urls = {
    newToken: `https://api.themoviedb.org/3/authentication/token/new?api_key=60773f18ef6a7a9ee3d4a640fab964eb`,
    validateToken: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=60773f18ef6a7a9ee3d4a640fab964eb&username=${data.userName}&password=${data.password}&request_token=:token`,
    newSession: `https://api.themoviedb.org/3/authentication/session/new?api_key=60773f18ef6a7a9ee3d4a640fab964eb&request_token=:token`,
    account: `https://api.themoviedb.org/3/account?api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId`,
    favMovies: `https://api.themoviedb.org/3/account/:userId/favorite/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId`,
    watchListMovies: `https://api.themoviedb.org/3/account/:userId/watchlist/movies?&api_key=60773f18ef6a7a9ee3d4a640fab964eb&session_id=:sessionId`
  }
  return [urls[url1], urls[url2], urls[url3], urls[url4]];
};

export const authSvcDefaults = () => {
  return {
    hasAuth: false,
    sessionId: null,
    userId: null,
    userName: null,
  };
};

export const authSvcUserHasAuth = () => {
  return {
    hasAuth: true,
    sessionId: ':sessionId',
    userId: ':userId',
    userName: ':userName',
  };
};

export const movieServiceDefaultState = () => {
  let currentYear = new Date().getFullYear();
  return {
    isFetching:true,
    hasError: false,
    pageNo:1,
    collectionSize:20,
    movies:[],
    genres:[],
    errorStatus:{},
    filters: {
      years: [
        {id:null, name: 'None', type: 'years'},
        {id:currentYear, name: currentYear, type: 'years'},
        {id:currentYear-1, name: currentYear-1, type: 'years'},
        {id:currentYear-2, name: currentYear-2, type: 'years'},
        {id:currentYear-3, name: currentYear-3, type: 'years'}
      ],
      otherFilters: [
        {id:null, name: 'None', type: 'otherFilters'},
        {id:'primary_release_date.asc', name: 'Releae Date Asc', type: 'otherFilters'},
        {id:'primary_release_date.desc', name: 'Releae Date Desc', type: 'otherFilters'}
      ],
      genres:[]
    },
    selectedFilters: {
      years: {},
      otherFilters:{},
      multiSelectors: []
    }
  };
};
