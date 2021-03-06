import { hotpCounter, totpCounter, totpToken, totpOptions } from 'otplib-core';
import crypto from 'crypto';
import rfc6238 from './rfc6238';

describe('RFC 6238', () => {
  rfc6238.table.forEach(row => {
    const id = `${row.algorithm} / ${row.epoch}`;

    test(`[${id}] expected counter value`, () => {
      const counter = hotpCounter(totpCounter(row.epoch * 1000, rfc6238.step));
      expect(counter.toUpperCase()).toBe(row.counter);
    });

    test(`[${id}] ${row.token} token`, () => {
      const result = totpToken(
        rfc6238.secret,
        totpOptions({
          crypto,
          algorithm: row.algorithm,
          digits: 8,
          epoch: row.epoch,
          step: 30
        })
      );

      expect(result).toBe(row.token);
    });
  });
});
