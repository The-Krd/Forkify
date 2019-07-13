import axios from 'axios';

async function getResults(query){
    const key = 'e2e12d80f62b419d4fbfe0b36261b1ad';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}
getResults("west");




