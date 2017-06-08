import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }
  public getMovieGenres = (movieGenre=[], genres=[], selectedGenres=[]) =>{
    let movieGenres = [];
     movieGenre.forEach((elem) => {
       let genre = genres.filter((item)=> {
         return item.id === elem;
       });
         movieGenres = [...movieGenres, ...genre]; //concatinating both arrays...
      });
    //to map selected items in the filter..
     movieGenres.map((elem)=>{
       selectedGenres.forEach((selected)=>{
         if(elem.id === selected.id) {
           elem.selected = true;
         }
       });
     });
    return movieGenres;
  }

  public toFromDates = (d) => {
    //let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth()+ 1;
    let yy = d.getFullYear();
    let fromDate = yy + '-' + mm + '-' + dd;
    let lastDay = dd-1;
    lastDay = (lastDay) ? lastDay : lastDay+1;
    let toDate = yy + '-' + (mm-1) + '-' + lastDay;
    return {fromDate, toDate};
  }
}
