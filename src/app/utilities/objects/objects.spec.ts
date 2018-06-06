import { makeKeyStr } from './objects';

describe('makeKeyStr', () => {
  const mockObject: Object = {key1: 'value1', key2: 'value2'};
  it('Returns a string from an object\'s key values', () => {
    expect(makeKeyStr(mockObject)).toBe('value1value2');
  });

});
