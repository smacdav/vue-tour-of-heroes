<template>
    <div>
        <div v-if="hero">
            <h2>{{hero.name | uppercase}}</h2>
            <div><span>id: </span>{{hero.id}}</div>
            <div>
                <label>name:
                    <input v-model="hero.name" placeholder="name" />
                </label>
            </div>
            <button @click="goBack">go back</button>
            <button @click="save">save</button>
        </div>
    </div>
</template>

<script>
    import {Hero} from "@/hero";

    export default {
        name: "HeroDetail",
        data() {
            return {
                hero: Hero,
                initialName: ''
            }
        },
        methods: {
            getHero() {
                const id = +this.$route.params.id;
                this.$heroService.getHero(id).subscribe(response => {
                    this.hero = response.body.hero;
                    this.initialName = response.body.hero.name;
                });
            },
            goBack() {
                // Necessary to fix a bug caused by the fact that Vue uses a virtual DOM and angular does not
                this.hero.name = this.initialName;
                this.$router.back();
            },
            save() {
                this.$heroService.updateHero(this.hero).subscribe(() => this.$router.back());
            }
        },
        // created is run when initializing the created component
        created() {
            this.getHero();
        },
        watch: {
            '$route': 'getHero'
        },
        filters: {
            uppercase: function(v) {
                return v.toUpperCase();
            }
        }
    }
</script>

<style scoped>
    /* HeroDetailComponent's private CSS styles */
    label {
        display: inline-block;
        width: 3em;
        margin: .5em 0;
        color: #607D8B;
        font-weight: bold;
    }
    input {
        height: 2em;
        font-size: 1em;
        padding-left: .4em;
    }
    button {
        margin-top: 20px;
        font-family: Arial;
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        cursor: hand;
    }
    button:hover {
        background-color: #cfd8dc;
    }
    button:disabled {
        background-color: #eee;
        color: #ccc;
        cursor: auto;
    }
</style>
