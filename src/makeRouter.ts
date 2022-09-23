import Router from './Router';

type router = {
    path: string,
    handler: () => string,
}

const makeRouter = (routes: router[]) => new Router(routes);

export default makeRouter;
