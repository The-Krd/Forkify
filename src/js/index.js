import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
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

/**
 * list cntrler
 */

const controlList = () => {
    //create list if there is not yet
    if (!state.list) state.list = new List();
    //add ingredient to list and UI
    state.recipe.ingredients.forEach( el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item);
    })
}

//handle delete and update list items
elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid

    //handle delete butt
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id);

        // delet from UI
        listView.deleteItem(id);

        //handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
})

/**
 LIKES CONTROLLER
 */
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    //not liked cur recipe
    if(!state.likes.isLiked(currentID)) {
        //add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        //toggle like button

        //add like to UI
        console.log(state.likes);

    //user liked curr recipe
    } else {
        //remove like from state
        state.likes.deleteLike(currentID);

        //toggle like button

        //remove like from UI
        console.log(state.likes);
    };
};

//recipe button "+" / "-" clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if ( state.recipe.servings > 1){
        state.recipe.updateServings('dec')
        recipeView.updateServingsIngredients(state.recipe);
    };
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //adding ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
    // console.log(state.recipe);
    // recipeView.renderRecipe(state.recipe);
})

window.l = new List();
