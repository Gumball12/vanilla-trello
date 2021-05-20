import randomString from '../randomString';

test('test random string generator function', () => {
  Array(10000)
    .fill(0)
    .map(randomString)
    .every((v, ind, arr) => arr.findIndex(_v => _v === v) === ind);
});
