import routerToDyno from "./routerToDyno";
import insertRouterIntoTree from "./insertRouterIntoTree";
import findInPrefixTree from "./findInPrefixTree";

export type TRouter = {
  path: string,
  handler: () => string,
}

export type TDynoRouter = {
  path: string,
  handler: () => string,
  params?: string[]
}

export type TPrefixTree = any;

export default class Router {
  routesTree: TPrefixTree = {};
  constructor(routers: TRouter[]) {
    const dynoRouters = routers.map(routerToDyno);
    dynoRouters.forEach((dynoRouter) => insertRouterIntoTree(dynoRouter, this.routesTree));
  }
  serve(path: string) {
    const routeMatch = findInPrefixTree(path, this.routesTree);
    const matches = path.match(new RegExp(`${routeMatch.path}$`));
    if (!matches) {
      throw new Error('route not found');
    }
    if (!routeMatch.params) {
      return {path: routeMatch.path, handler: routeMatch.handler};
    }
    const params: Record<string, string> = {};
    routeMatch.params.forEach((param: string, index: number) => {
      const value = matches[index + 1]
      if (!value) {
        return;
      }
      params[param] = value;
    });
    console.log(params);
    return {path: routeMatch.path, handler: routeMatch.handler, params};
  }
}
