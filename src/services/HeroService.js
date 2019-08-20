import MessageService from "@/services/MessageService";
import Vue from 'vue';
import {catchError, tap} from "rxjs/operators";
import { Observable, of } from "rxjs";

class HeroService {
    static serviceInstance;
    heroesUrl = '/api/heroes';

    // TODO: Use dependency injection
    messageService = MessageService.instance();

    static instance() {
        if (!HeroService.serviceInstance) {
            HeroService.serviceInstance = new HeroService();
        }

        return HeroService.serviceInstance;
    }
    getHeroes(callback) {
        Vue.http.get(this.heroesUrl)
            .then(
                response => {
                    callback(response.body.heroes);
                    this.log('fetched heroes');
                },
                this.handleError('getHeroes', []));
    }

    getHero(id, callback) {
        Vue.http.get(`${this.heroesUrl}/${id}`)
            .then(
                response => {
                    callback(response.body.hero);
                    this.log(`fetched hero id=${id}`);
                },
                this.handleError(`getHero id=${id}`)
            );
    }

    updateHero(hero) {
        Vue.http.put(this.heroesUrl, { hero })
            .then(
                response => {},
                this.handleError(`updateHero id=${hero.id}, name=${hero.name}`)
            );
    }

    addHero(hero) {
        Vue.http.post(this.heroesUrl, { hero })
            .then(
                response => {},
                this.handleError(`addHero name=${hero.name}`)
            );
    }

    deleteHero(hero) {
        Vue.http.delete(this.heroesUrl, {hero})
            .then(
                response => {},
                this.handleError(`deleteHero id=${hero.id} name=${hero.name}`)
            );
    }

    searchHeroes(term, callback) {
        if (!term.trim()) {
            callback({ body: []});
            return;
        }

        Vue.http.get(`${this.heroesUrl}/?name=${term}`)
            .then(
                resp => callback(resp),
                this.handleError(`searchHeroes term=${term}`)
            );
    }


    handleError(operation = 'operation', result) {
        return (error => {
            // TODO: send the error to remote logging infrastructure
            console.error(error);
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            return result;
        });
    }

    log(message) {
        this.messageService.add(`HeroService: ${message}`);
    }
}

export default HeroService;
