import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/Observable/range';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/forkJoin';
import 'rxjs/add/Observable/throw';
import { paths } from './locationPaths';
import { UtilService } from './util.service';


@Injectable()
export class MovieService {
  movies: any = [];
  constructor(private _http: Http, private _utilSvc: UtilService) { }

  public getMovies(pageNo, currentRoute) { console.log('util', this._utilSvc)
    switch(currentRoute) {
      case 'movies':
        return this.getAllMovies(pageNo)
      case 'popular':
        return this.getPopularMovies(pageNo);
      case 'upComing':
        return this.getUpComingMovies(pageNo);
      case 'latest':
        return this.getLatestMovies(pageNo);
    }
  }

  public searchMovies(movie) {
    return this._http.get(`${paths.apiUrl}/search/multi${paths.apiKey}&language=en-US&query=${movie}`)
             .map((res: Response)=>{ console.log('res', res.json());
              let data = res.json().results;
              let movieYear;
              data.map((movie)=> {
                if(movie.release_date) {
                  movieYear = new Date(movie.release_date);
                  movieYear = movieYear.getFullYear();
                  movie.releaseYear = movieYear;
                }
              });
              return data.filter((movie)=> movie.media_type === 'movie');
               //return res.json().results.filter((movie)=> movie.media_type === 'movie');
             });
  }

  public getAllMovies(pageNo: number) {
    return Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/discover/movie${paths.apiKey}&page=${pageNo}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    );
  }

  public getPopularMovies(pageNo: number) {
    return Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    );
  }

  public getUpComingMovies(pageNo: number) {
    return Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/movie/upcoming${paths.apiKey}&page=${pageNo}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    );
  }

  public getLatestMovies(pageNo: number) {
    let {toDate, fromDate} = this._utilSvc.toFromDates();
    return Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/discover/movie?primary_release_date.gte=${toDate}&primary_release_date.lte=${fromDate}&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).map((res)=> res.json())
    );
  }

  public getMovieDetails(id: number) { console.log('iddd', id)
    return Observable.forkJoin(
      this._http.get(`${paths.apiUrl}/movie/${id}${paths.apiKey}`).map((res) => res.json()).catch(this.handleError),
      this._http.get(`${paths.apiUrl}/movie/${id}/videos${paths.apiKey}`).map((res)=> res.json()),
      this._http.get(`${paths.apiUrl}/movie/${id}/images${paths.apiKey}`).map((res)=> {
        let data = res.json();
        let posters = (data.posters.length>6)? data.posters.slice(1, 6) : data.posters;
        return posters.map(res=>res.file_path);
      }),
      this._http.get(`${paths.apiUrl}/movie/${id}/casts${paths.apiKey}`).map((res)=> res.json())
    );

  }

  public handleError(error: Response) {
    return Observable.throw(error);
  }
}
