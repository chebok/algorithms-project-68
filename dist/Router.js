export default class Router {
    constructor(routers) {
        this.routes = routers.map((router) => {
            const params = router.path.match(/(?<=:)(\w+)/g);
            if (params === null) {
                return { path: router.path.replace(/(:\w+)/g, '(\\w+)'),
                    handler: router.handler,
                };
            }
            else {
                return {
                    path: router.path.replace(/(:\w+)/g, '(\\w+)'),
                    handler: router.handler,
                    params: params,
                };
            }
        });
    }
    serve(path) {
        const routeMatch = this.routes.find((route) => path.match(new RegExp(`${route.path}$`)));
        if (!routeMatch) {
            throw new Error('route not found');
        }
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
