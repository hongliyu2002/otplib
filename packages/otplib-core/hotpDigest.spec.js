import hotpDigest from './hotpDigest';

describe('hotpDigest', () => {
  const secret = 'test';
  const counter = 0;
  const noop = () => {};

  const noCrypto = 'Expecting options.crypto to have a createHmac function';
  const noCreateHmacSecret =
    'Expecting options.createHmacSecret to be a function';
  const noAlgorithm = 'Expecting options.algorithm to be a string';

  it('should throw an error if options is null', () => {
    expect(() => hotpDigest(secret, counter, null)).toThrow(Error);
  });

  it('should throw an error if options is undefined', () => {
    expect(() => hotpDigest(secret, counter)).toThrow(Error);
  });

  it('should throw an error if options is not an object', () => {
    expect(() => hotpDigest(secret, counter, 'notObject')).toThrow(Error);
  });

  it('should throw an error if options.crypto is undefined', () => {
    expect(() => hotpDigest(secret, counter, {})).toThrowError(noCrypto);
  });

  it('should throw an error if options.crypto.createHmac is not a function', () => {
    expect(() => hotpDigest(secret, counter, { crypto: {} })).toThrowError(
      noCrypto
    );
  });

  it('should throw an error if options.createHmacSecret is not a function', () => {
    const options = {
      crypto: { createHmac: noop }
    };
    expect(() => hotpDigest(secret, counter, options)).toThrowError(
      noCreateHmacSecret
    );
  });

  it('should throw an error if options.alogrithm is not a string', () => {
    const options = {
      crypto: { createHmac: noop },
      createHmacSecret: noop
    };
    expect(() => hotpDigest(secret, counter, options)).toThrowError(
      noAlgorithm
    );
  });
});
