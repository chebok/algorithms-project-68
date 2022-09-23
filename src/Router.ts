type router = {
  path: string,
  handler: () => string,
}

export default class Router {
  constructor(private routes: router[]) {}

  serve(path: string) {
    const handler = this.routes.find((route) => route.path === path);
    if (!handler) {
      throw new Error('route not found');
    }
    return handler.handler;
  }
}
