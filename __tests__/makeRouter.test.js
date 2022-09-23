import makeRouter from '../dist/makeRouter';

const routes = [
    {
      // Роутер используется как часть на конкретном сайте, поэтому роутеру нужно знать лишь про сами маршруты на сайте
      // не учитываем протокол, хост и т. д.
      path: '/courses', // маршрут
      handler: () => 'courses!', // обработчик
    },
    {
      path: '/courses/basics',
      handler: () => 'basics',
    },
];


test('existing path', () => {
  const router = makeRouter(routes);
  const path = '/courses';
  const handler = router.serve(path);
  expect(handler()).toEqual('courses!')
});

test('not existing path', () => {
    const router = makeRouter(routes);
    expect(() => router.serve('/no_such_way')).toThrow('route not found');
})