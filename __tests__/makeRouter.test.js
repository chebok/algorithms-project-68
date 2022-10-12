import makeRouter from '../dist/makeRouter';

const routes = [
  {
    path: '/courses/:id',
    handler: () => 'course!',
  },
  {
    path: '/user/:id',
    handler: () => 'user!',
  },
  {
    path: '/user',
    handler: () => 'all users!',
  },
  {
    path: '/courses/:course_id/exercises/:id',
    handler: () => 'exercise!',
  },
];

test('static path1', () => {
  const router = makeRouter(routes);
  const path = '/user';
  const route = router.serve(path);
  expect(route.handler()).toEqual('all users!');
});

test('dynamic path1', () => {
  const router = makeRouter(routes);
  const path = '/courses/php_trees';
  const route = router.serve(path);
  expect(route.handler()).toEqual('course!');
  expect(route.params.id).toEqual('php_trees');
});

test('dynamic path2', () => {
  const router = makeRouter(routes);
  const path = '/courses/js/exercises/string';
  const route = router.serve(path);
  expect(route.handler()).toEqual('exercise!');
  expect(route.params.id).toEqual('string');
});

test('not existing path', () => {
    const router = makeRouter(routes);
    expect(() => router.serve('/no_such_way')).toThrow('route not found');
})