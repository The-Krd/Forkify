import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * search object
 * current recipe obj
 * shopping list obj
 * liked recipes
 */
const state = {};

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
