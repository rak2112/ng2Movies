import { Injectable } from '@angular/core';
import { paths } from './locationPaths';
import { IMSelector, ISelectedFilters } from '../models/index';
@Injectable()
export class UtilService {
  
  public getMovieGenres = (movieGenre=[], genres = [], selectedGenres=[]) => {

     let movieGenres = movieGenre.reduce((movieGenres, elem)=> {
			 let genre = genres.find((item)=> item.id === elem);
			 if(genre) {
				genre['selected'] = (selectedGenres.find((selected)=> selected.id === elem)) ? true : false;
			 }
			 else{
				genre = {};
			 }
			 return [...movieGenres, genre];
     	}, []);
    	return movieGenres;
  }

  public toFromDates = (d) => {
    let dd = d.getDate();
    let mm = d.getMonth()+ 1;
    let yy = d.getFullYear();
    const fromDate = `${yy}-${mm}-${dd}`;
    let lastDay = dd-1;
    const toDate = `${(mm === 1 ) ? yy-1 : yy}-${(mm === 1 ) ? 12 : mm-1}-${(lastDay) ? lastDay : lastDay+1}`
    return {fromDate, toDate};
	}
	public getUrlYear = (years) => {
    let yearUrl = (years.id) ? `&primary_release_year=${years.id}` : '';
    return yearUrl;
  }
  public getUrlOrder = (otherFilters) => {
    let sortUrl = (otherFilters.id) ? `&sort_by=${otherFilters.id}` : '';
    return sortUrl;
  }
  public getUrlGenres = (multiSelectors) =>{
    let totalGenres = multiSelectors.length;
    let genreUrl = ``;
    if(totalGenres) {
      for(let i=0;i<totalGenres; i++) {
        genreUrl += `&with_genres=${multiSelectors[i].id}`;
      }
    }
    else {
      genreUrl = '';
    }
    return genreUrl;
	}

	public getTypeFilters = (currentFilter, selectedFilters) => {
		switch(currentFilter.type) {
			case 'years':
				return {
					...selectedFilters,
					years: {
						...selectedFilters.years, ...currentFilter
					}
				}
			case 'otherFilters':
				return {
					...selectedFilters,
					otherFilters: {
						...selectedFilters.otherFilters, ...currentFilter
					}
				}
			case 'remove_genres':
				return {
					...selectedFilters,
					//multiSelectors
					multiSelectors: [...selectedFilters.multiSelectors.slice(0, currentFilter.index), ...selectedFilters.multiSelectors.slice(currentFilter.index + 1)]
				}
			case 'noCurrentFilter':
				return selectedFilters;	
			default: 
				return {
					...selectedFilters,
							multiSelectors: (!selectedFilters.multiSelectors.find((item) => item.id === currentFilter.id)) ? [...selectedFilters.multiSelectors, currentFilter]: selectedFilters.multiSelectors
				}	
		}
	}

	
	public getFullUrl = ({pageNo =  1, currentFilter, selectedFilters = {years:{}, otherFilters:{}, multiSelectors:[]}}: {pageNo: number, currentFilter: IMSelector, selectedFilters: ISelectedFilters}, url: string) => {
		
		let baseUrl = `${paths.apiUrl}${url}${paths.apiKey}&page=${pageNo}`;
		let filters = (currentFilter) ? this.getTypeFilters(currentFilter, selectedFilters) : selectedFilters;
		let { years, otherFilters, multiSelectors } = filters;
	
		let filterUrl = `${paths.apiUrl}/discover/movie${paths.apiKey}${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
		let moviesUrl = (multiSelectors.length || years.id || otherFilters.id) ? filterUrl : baseUrl;
		
		return moviesUrl;
	}

	public getPopularUrl = ({pageNo =  1, currentFilter, selectedFilters = {years:{}, otherFilters:{}, multiSelectors:[]}}: {pageNo: number, currentFilter: IMSelector, selectedFilters: ISelectedFilters}) =>{
		let baseUrl = `${paths.apiUrl}/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`;
    let filters = (currentFilter) ? this.getTypeFilters(currentFilter, selectedFilters) : selectedFilters;
		let { years, otherFilters, multiSelectors } = filters;

    let filterUrl = `${paths.apiUrl}/discover/movie${paths.apiKey}${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}&sort_by=vote_average.desc${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
		let moviesUrl = (multiSelectors.length  || years.id || otherFilters.id) ? filterUrl : baseUrl;
		
		return moviesUrl;
	}

	public getCinemasUrl = ({pageNo =  1, currentFilter, selectedFilters = {years:{}, otherFilters:{}, multiSelectors:[]}}: {pageNo: number, currentFilter: IMSelector, selectedFilters: ISelectedFilters}) => {
		let baseUrl = `${paths.apiUrl}/movie/now_playing${paths.apiKey}&language=en-US&page=${pageNo}`;
		let filters = (currentFilter) ? this.getTypeFilters(currentFilter, selectedFilters) : selectedFilters;
		let { years, otherFilters, multiSelectors } = filters;

    let filterUrl = `${paths.apiUrl}/movie/now_playing${paths.apiKey}&language=en-US${this.getUrlYear(years)}${this.getUrlGenres(multiSelectors)}${this.getUrlOrder(otherFilters)}&page=${pageNo}`;
		let moviesUrl = (multiSelectors.length || years.id || otherFilters.id) ? filterUrl : baseUrl;
		
		return moviesUrl;
	}
}


