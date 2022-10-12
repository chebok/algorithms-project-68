import type { TPrefixTree } from "./Router";

const findInPrefixTree = (path: string, tree: TPrefixTree) => {
  const keys = path.split('/').filter(key => key !== '');
  const router = keys.reduce((acc, key) => {
    if (acc[key]) {
      return acc[key];
    } 
    if (acc['(\\w+)']) {
      return acc['(\\w+)'];
    }
    throw new Error('route not found');
  },tree).router;
  return router;
};

export default findInPrefixTree;