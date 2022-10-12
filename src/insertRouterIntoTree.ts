import type { TDynoRouter } from "./Router"
import type { TPrefixTree } from "./Router";

const insertRouterIntoTree = (router: TDynoRouter, tree: TPrefixTree) => {
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