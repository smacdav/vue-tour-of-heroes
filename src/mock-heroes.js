let nextId = 21;
let heroes = [
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
let hero;

// export default {
//     ['GET /api/heroes'] (pathMatch, query, request) {
//          let body = {
//             heroes
//         };
//
//         return {
//             body: body,
//             status: 200,
//             statusText: 'OK',
//             headers: {'Content-Type': 'application/json'},
//             delay: 500
//         }
//     }
// }
let mockRoutes = [
    {
        method: 'GET',
        url: '^/api/heroes$',
        response: { heroes }
    }
];

export default function handleRequest(request, next) {

    if (request.method === 'GET' && request.url.match('/api/heroes/[0-9]+')) {
        let id = +request.url.substring(request.url.lastIndexOf('/') + 1);
        hero = heroes.find(h => h.id === id);
        next(request.respondWith(
            { hero },
            { status: 200 }
            )
        );
        return;
    }

    let mockRoute = mockRoutes.find((item) => request.method === item.method && request.url.match(item.url));
    if (!mockRoute) {
        next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}));
    } else {
        next (request.respondWith(
            mockRoute.response,
            { status: 200 }
        ));
    }
}
