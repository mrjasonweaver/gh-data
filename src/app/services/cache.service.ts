import { Injectable } from '@angular/core';

export interface CacheContent {
  expiry: number;
  value: Object;
}

/**
 * Cache Service is a simple in-memory cache implementation
 * @export
 * @class CacheService
 */
@Injectable()
export class CacheService {
  private _cache: Map<string, CacheContent> = new Map<string, CacheContent>();
  readonly maxAge: number = 60000;

  /**
   * Returns a value based on a key in the cache
   * @param key The key of the value to return
   */
  getCache(key: string): any {
    return this._cache.get(key);
  }

  /**
   * Sets the key and cached content in the cache map
   * @param key The key to use for the cached content
   * @param value Value of cached content
   * @param maxAge Optional max age of expiry (default 60 seconds)
   */
  setCache(key: string, value: any, maxAge?): Map<string, CacheContent> {
    const expiry = Date.now() + (maxAge || this.maxAge);
    return this._cache.set(key, { value, expiry });
  }

  /**
   * Returns a boolean.
   * Checks if the key is in the cache map and if the expiry is
   * still within the given time
   * @param key The key to search for in the cache map
   */
  validKey(key: string): boolean {
    return this._cache.has(key) && this._cache.get(key).expiry > Date.now();
  }

}
