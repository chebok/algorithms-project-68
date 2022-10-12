import routerToDyno from "./routerToDyno";
import insertRouterIntoTree from "./insertRouterIntoTree";
import findInPrefixTree from "./findInPrefixTree";
export default class Router {
    constructor(routers) {
        this.routesTree = {};
        const dynoRouters = routers.map(routerToDyno);
        dynoRouters.forEach((dynoRouter) => insertRouterIntoTree(dynoRouter, this.routesTree));
    }
    serve(path) {
        const routeMatch = findInPrefixTree(path, this.routesTree);
        const matches = path.match(new RegExp(`${routeMatch.path}$`));
        if (!matches) {
            throw new Error('route not found');
        }
        if (!routeMatch.params) {
            return { path: routeMatch.path, handler: routeMatch.handler };
        }
        const params = {};
        routeMatch.params.forEach((param, index) => {
            const value = matches[index + 1];
            if (!value) {
                return;
            }
            params[param] = value;
        });
        console.log(params);
        return { path: routeMatch.path, handler: routeMatch.handler, params };
    }
}
