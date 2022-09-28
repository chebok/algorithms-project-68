export default class Router {
    constructor(routes) {
        this.routes = routes;
    }
    serve(path) {
        let result = {};
        const routeMatch = this.routes.find((route) => {
            const regRoute = route.path.replace(/(:\w+)/g, '(\\w+)');
            const matches = path.match(new RegExp(`${regRoute}$`));
            if (matches === null) {
                return false;
            }
            const init = {};
            const params = route.path.match(/(?<=:)(\w+)/g)?.reduce((acc, param, index) => {
                return { ...acc, [param]: matches[index + 1] };
            }, init);
            result = { path: route.path, handler: route.handler, params };
            return true;
        });
        if (!routeMatch) {
            throw new Error('route not found');
        }
        return result;
    }
}
