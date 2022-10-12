const routerToDyno = (router) => {
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
};
export default routerToDyno;
