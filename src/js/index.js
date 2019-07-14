import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * search object
 * current recipe obj
 * shopping list obj
 * liked recipes
 */
const state = {};


//SEARCH CONTRLLR
const controlSearch = async () => {
    //get query value from view
    const query = searchView.getInput();

    if(query){
        //add newsearch objk and add to state
        state.search = new Search(query);
        // prepare UI for rezuullt
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //search for reciepes
        await state.search.getResults();

        // render resurts on UI
        clearLoader();
        searchView.renderResults(state.search.result); 
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultsPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage); 
    }
})

//RECIPE CNTRLR
const r = new Recipe(46956);
r.getRecipe();
console.log(r);

// const controlRecipe = {

// }