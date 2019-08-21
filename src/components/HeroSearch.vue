<template>
<div id="search-component">
    <h4><label for="search-box">Hero Search</label> </h4>
    <input id="search-box" v-model="searchTerm" @input="search" />

    <div v-if="heroes">
    <ul class="search-result">
        <li v-for="hero in heroes" :key="hero.id">
            <router-link :to="`/detail/${hero.id}`">{{hero.name}}</router-link>
        </li>
    </ul>
    </div>
</div>
</template>

<script>
    import { Subject } from 'rxjs';

    export default {
        name: "HeroSearch",
        data() {
            return {
                heroes: [],
                searchTerm: '',
                searchTerms: new Subject()
            }
        },
        methods: {
            search() {
                this.searchTerms.next(this.searchTerm);
            }
        },
        created() {
            this.searchTerms
                .debounceTime(300)
                .distinctUntilChanged()
                .subscribe(
                    () => this.$heroService.searchHeroes(this.searchTerm)
                        .subscribe(res => this.heroes = res.body.heroes)
                );
        }
    }
</script>

<style scoped>
    /* HeroSearch private styles */
    .search-result li {
        border-bottom: 1px solid gray;
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        width: 195px;
        height: 16px;
        padding: 5px;
        background-color: white;
        cursor: pointer;
        list-style-type: none;
    }

    .search-result li:hover {
        background-color: #607D8B;
    }

    .search-result li a {
        color: #888;
        display: block;
        text-decoration: none;
    }

    .search-result li a:hover {
        color: white;
    }
    .search-result li a:active {
        color: white;
    }
    #search-box {
        width: 200px;
        height: 20px;
    }


    ul.search-result {
        margin-top: 0;
        padding-left: 0;
    }
</style>
