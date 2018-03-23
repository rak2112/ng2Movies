// import { ActionReducerMap, createFeatureSelector, ActionReducer, MetaReducer, createSelector } from '@ngrx/store';
// import { routerReducer as router, RouterReducerState } from '@ngrx/router-store';
// import { storeLogger } from 'ngrx-store-logger';
// // import { environment } from '../environments/environment';
// // import { getChargeById } from './contexts';
// import {
//   reducers as coreReducers,
//   metaReducers as coreMetaReducers,
//   State as CoreState,
//   RouterStateUrl,
//   getCase,
//   getPersons,
//   getReview
// } from './core';

// export { getCase } from './core';

// export interface State extends CoreState {
//   router: RouterReducerState<RouterStateUrl>;
// }

// export const reducers: ActionReducerMap<State> = {
//   ...coreReducers,
//   router
// };

// export const logger = (reducer: ActionReducer<State>): ActionReducer<State> => {
//   return storeLogger({ collapsed: true })(reducer);
// };

// export const getRouteParams = (state: State) => state.router.state.params as { [key: string]: string };


// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? [logger]
//   : [];
