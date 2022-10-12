const insertRouterIntoTree = (router, tree) => {
    const keys = router.path.split('/').filter(key => key !== '');
    const result = keys.reduce((acc, key) => {
        if (!acc[key]) {
            acc[key] = {};
        }
        return acc[key];
    }, tree);
    result.router = router;
};
export default insertRouterIntoTree;
