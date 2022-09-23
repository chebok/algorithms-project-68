export default class Router {
    constructor(routes) {
        this.routes = routes;
    }
    serve(path) {
        const handler = this.routes.find((route) => route.path === path);
        if (!handler) {
            throw new Error('route not found');
        }
        return handler.handler;
    }
}
