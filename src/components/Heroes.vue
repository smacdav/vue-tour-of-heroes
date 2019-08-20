<template>
    <div>
         <h2>My Heroes</h2>
        <div>
            <label>Hero name:
                <input v-model="hero.name" id="heroName" />
            </label>
            <!-- @click passes input value to add() and then clears the input -->
            <button @click="add">add</button>
        </div>
        <div v-if="loading">Loading Heroes, Please Wait</div>
        <ul class="heroes">
            <li v-for="hero in heroes">
                <router-link :to="`/detail/${hero.id}`">
                    <span class="badge">{{hero.id}}</span> {{hero.name}}
                </router-link>
                <button class="delete" title="delete hero" @click="deleteHero(hero)">x</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Hero } from "@/hero";
    import HeroDetail from "@/components/HeroDetail";

    export default {
        name: "Heroes",
        components: {HeroDetail},
        data() {
            let hero = new Hero();

            return {
                loading: false,
                hero: hero,
                selectedHero: undefined,
                heroes: [],
            };
        },
        methods: {
            getHeroes() {
                this.loading = true;
                this.$heroService.getHeroes(heroes => this.heroes = heroes);
                this.loading = false;
            },
            add() {
                if (!this.hero.name) {
                    return;
                }
                let name = this.hero.name.trim();
                if (!name) {
                    return;
                }
                this.$heroService.addHero({ name });
                this.hero.name = '';
            },
            deleteHero(hero) {
                this.heroes = this.heroes.filter(h => h !== hero);
                this.$heroService.deleteHero(hero);
            }
        },
        // created is run when initializing the created component
        created() {
            this.getHeroes();
        }
    }
</script>

<style scoped>
    /* HeroesComponent's private CSS styles */
    .heroes {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
    }
    .heroes li {
        position: relative;
        cursor: pointer;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
    }

    .heroes li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
    }

    .heroes a {
        color: #333;
        text-decoration: none;
        position: relative;
        display: block;
        width: 250px;
    }

    .heroes a:hover {
        color:#607D8B;
    }

    .heroes .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color:#405061;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        min-width: 16px;
        text-align: right;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
    }

    button {
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        cursor: hand;
        font-family: Arial;
    }

    button:hover {
        background-color: #cfd8dc;
    }

    button.delete {
        position: relative;
        left: 194px;
        top: -32px;
        background-color: gray !important;
        color: white;
    }
</style>
