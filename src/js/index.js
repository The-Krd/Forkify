import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
    // const query = searchView.getInput();
    const query = searchView.getInput();

    if(query){
        //add newsearch objk and add to state
        state.search = new Search(query);
        // prepare UI for rezuullt
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //search for reciepes
            await state.search.getResults();
    
            // render resurts on UI
            clearLoader();
            searchView.renderResults(state.search.result); 

        } catch (err) {
            alert ('Somenthing wrocng with the search');
            clearLoader();
        }

    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

//for testing only
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// })

elements.searchResultsPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage); 
    }
})

//RECIPE CNTRLR
const controlRecipe = async () => {
    //get ID from ?URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //higjlight selected
        if (state.search) searchView.highlightSelected(id);

        //create new obj dfor reciope
        state.recipe = new Recipe(id);

        //only for tests
        // window.r = state.recipe;

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            //calc servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            //render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);  > simpler vv
['hashchange', 'load'].forEach( e => window.addEventListener(e, controlRecipe));