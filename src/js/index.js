import Search from './models/Search';

/**
 * search object
 * current recipe obj
 * shopping list obj
 * liked recipes
 */
const state = {};

const controlSearch = async () => {
    //get query value from view
    const query = 'cat'

    if(query){
        //add newsearch objk and add to state
        state.search = new Search(query);
        // prepare UI for rezuullt

        //search for reciepes
        await state.search.getResults();

        // render resurts on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
