import { CacheService } from './cache.service';

describe('CacheService', () => {
  let cache;
  let mockCacheMap;
  let mockKey;
  let mockContent;

  beforeEach(() => {
    cache = new CacheService();
    mockCacheMap = new Map();
    mockKey = '1234abcd';
    mockContent = 'hello!';
    cache.setCache(mockKey, mockContent);
  });

  describe('#getCache', () => {
    it('is defined', () => {
      expect('getCache').not.toBeUndefined();
    });
    it('Returns a value based on a key in the cache', () => {
      expect(cache.getCache(mockKey, mockContent).value).toBe(mockContent);
    });
  });

  describe('#setCache', () => {
    it('is defined', () => {
      expect('setCache').not.toBeUndefined();
    });
    it('Sets the key and cached content in the cache map', () => {
      expect(cache.setCache('1234', mockContent).has('1234')).toBe(true);
    });
  });

  describe('#validKey', () => {
    it('is defined', () => {
      expect('validKey').not.toBeUndefined();
    });
    it('Returns true when looking up a key that is present', () => {
      expect(cache.validKey(mockKey)).toBe(true);
    });
    it('Returns false when looking up a key that is not present', () => {
      expect(cache.validKey('123')).toBe(false);
    });
  });
});
