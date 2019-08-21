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
    getHeroes() {
        return Observable.fromPromise(Vue.http.get(this.heroesUrl))
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', { body: { heroes: [] } }))
            );
    }

    getHero(id) {
        return Observable.fromPromise(Vue.http.get(`${this.heroesUrl}/${id}`))
            .pipe(
                tap(_ => this.log(`fetched hero id=${id}`)),
                catchError(this.handleError(`getHero id=${id}`))
            );
    }

    /** PUT: update the hero on the server */
    updateHero(hero) {
        return Observable.fromPromise(Vue.http.put(this.heroesUrl, { hero }))
            .pipe(
                tap(_ => this.log(`updated hero id=${hero.id}`)),
                catchError(this.handleError('updateHero'))
            );
    }

    /** POST: add a new hero to the server */
    addHero(hero) {
        return Observable.fromPromise(Vue.http.post(this.heroesUrl, { hero }))
            .pipe(
                tap(_ => this.log(`added hero name=${hero.name}`)),
                catchError(this.handleError('addHero'))
            );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(hero) {
        return Observable.fromPromise(Vue.http.delete(this.heroesUrl, { hero }))
            .pipe(
                tap(_ => this.log(`deleted hero id=${hero.id}`)),
                catchError(this.handleError('deleteHero'))
            );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term) {
        if (!term.trim()) {
            return of({ body: { heroes: [] } });
        }

        return Observable.fromPromise(Vue.http.get(`${this.heroesUrl}/?name=${term}`))
            .pipe(
                tap(_ => this.log(`found heroes matching "${term}"`)),
                catchError(this.handleError('searchHeroes', { body: { heroes: [] } }))
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
