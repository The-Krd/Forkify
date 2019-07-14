import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        const key = '7f13c47aa1eba5b3a270b794329b7f0c';
        //e2e12d80f62b419d4fbfe0b36261b1ad   <<max query limit reached
        //7f13c47aa1eba5b3a270b794329b7f0c   <to change
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}
