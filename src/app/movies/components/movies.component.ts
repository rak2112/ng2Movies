import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IMovies, IGenre, IGenres, IMSelector, ISelectedFilters, IFilterChange  } from '../../core/models/index';
@Component({
  selector: 'app-movies',
	template: `
		<div>
			<div class="movies-app">
				<app-filters-cmp
					[filters]="movies.filters"
					[selectedFilters]="movies.selectedFilters"
					(onFilterChange)="filterChanged($event)"
					(onRemoveSelection)="filterRemoved($event)">
				</app-filters-cmp>
				<app-loader *ngIf="apiStatus.loading"></app-loader>
				<app-error-laoder *ngIf="apiStatus.hasError" [errorStatus]="apiStatus.errorStatus"></app-error-laoder>
				<div *ngIf="!apiStatus.loading && !apiStatus.hasError">
					<app-movie-list
						[user] = "user"
						[genres] = "genres.all"
						[selectedFilters] = "movies.selectedFilters"
						[movies]="movies.movies"
						(onEditWatchList) = "onEditFavList($event)"
						(onEditlist)="onEditFavList($event)">
					</app-movie-list>
					<div class="footer">
						<app-movies-pagination [pageNo]="movies.pageNo" [collectionSize]="movies.collectionSize" (selectedPage)="onPageChange($event)"></app-movies-pagination>
					</div>
				</div>
				
			</div>
		</div>
  `,
  styleUrls: ['./movies.component.scss']
})
export class AppMovies {
  @ViewChild('moviesTop') movieTop: ElementRef;
	@Input() public user;
	@Input() public apiStatus;
	@Input() public movies: IMovies;
	@Input() public genres: IGenres;
	@Input() public userView: string;

  @Output() onFilterChange: EventEmitter<IFilterChange> = new EventEmitter<IFilterChange>();

  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
	@Output() onRemoveSelection: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEditFavorites: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEditWatchList: EventEmitter<any> = new EventEmitter<any>();

	constructor(private renderer: Renderer) {
	}

  public filterChanged(currentFilter: {}) {
    this.onFilterChange.emit({currentFilter, selectedFilters: this.movies.selectedFilters});
  }

  public filterRemoved(currentFilter: any) {
		currentFilter.type = 'remove_genres';
    this.onRemoveSelection.emit({currentFilter,  selectedFilters: this.movies.selectedFilters});
  }

  public onPageChange(pageNo){
    this.selectedPage.emit({pageNo, selectedFilters: this.movies.selectedFilters });
  }

  public onEditFavList(data) :void {
		let { userId, sessionId } = this.user;
		let { id, watchList } = data;
		if(watchList) { 
			this.onEditWatchList.emit({...data, userId, sessionId});
		}
		else {
			this.onEditFavorites.emit({...data, userId, sessionId});
		}
  }
}
