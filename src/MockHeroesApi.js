class MockHeroesApi {
    baseUrl = '/api/heroes';
    idSearchUrl = this.baseUrl + '/[0-9]+';
    nameSearchUrl = this.baseUrl + '/\?.+';
    nextId = 21;
    heroes = [
        { id: 11, name: 'Dr Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];

    handleRequest(request, next) {
        let responseBody, jsonBody, index;
        if (request.url.match('^' + this.baseUrl + '$')) {
            switch (request.method) {
                case 'GET':
                    responseBody = { heroes: this.heroes }
                    break;
                case 'PUT':
                    this.editHero(request);
                    responseBody = {};
                    break;
                case 'POST':
                    this.insertHero(request);
                    responseBody = {};
                    break;
                case 'DELETE':
                    this.deleteHero(request);
                    responseBody = {};
                    break;
            }
        } else if (request.method === 'GET' && request.url.match(this.idSearchUrl)) {
            const id = +request.url.substring(request.url.lastIndexOf('/') + 1);
            const hero = this.heroes.find(h => h.id === id);
            responseBody = { hero };
        } else if (request.method === 'GET' && request.url.match(this.nameSearchUrl)) {
            const term = request.url.substring(request.url.indexOf('=') + 1);
            let found = this.heroes.filter(item => item.name.match(new RegExp(term, "i")));
            responseBody = { heroes: found };
        }

        if (responseBody) {
            next(request.respondWith(
                responseBody,
                { status: 200}
            ));
            return;
        }

        next(request.respondWith({ status: 404, statusText: 'Oh no! Not found!'}));
    }

    editHero(request) {
        let jsonBody = JSON.parse(request.body);
        let requestHero = jsonBody.hero;
        let hero = this.heroes.find(h => h.id === requestHero.id);
        let index = this.heroes.indexOf(hero);
        hero.name = requestHero.name;
        this.heroes.splice(index, 1, hero);
    }

    insertHero(request) {
        let jsonBody = JSON.parse(request.body);
        let newHero = jsonBody.hero;
        newHero.id = this.nextId;
        this.nextId++;
        this.heroes.push(newHero);
    }

    deleteHero(request) {
        let heroToDelete = request.hero;
        let index = this.heroes.indexOf(heroToDelete);
        this.heroes.splice(index, 1);
    }
}

export default MockHeroesApi;
