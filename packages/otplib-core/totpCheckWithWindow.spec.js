import crypto from 'crypto';
import totpCheckWithWindow from './totpCheckWithWindow';
import totpCheck from './totpCheck';
import totpOptions from './totpOptions';

jest.mock('./totpCheck', () => jest.fn());
const { default: totpCheckOriginal } = require.requireActual('./totpCheck');

describe('totpCheck', () => {
  const secret = 'i6im0gc96j0mn00c';

  const timeToken = [
    {
      time: 1519050965,
      token: 737086
    },
    {
      time: 1519050992,
      token: 555283
    },
    {
      time: 1519051024,
      token: 712564
    }
  ];

  function getOptions(n, win) {
    return totpOptions({
      crypto,
      epoch: timeToken[n].time,
      window: win
    });
  }

  function token(n) {
    return timeToken[n].token;
  }

  it('should throw an error when opt.window is undefined', () => {
    expect(() => totpCheckWithWindow('a', 'b', {})).toThrowError(
      'Expecting options.window to be a number'
    );
  });

  it('should call totpCheck 1 time when window is 0', () => {
    totpCheck.mockImplementation(() => false);

    totpCheckWithWindow(token(0), secret, getOptions(1, 0));

    expect(totpCheck).toHaveBeenCalledTimes(1);
  });

  it('should call totpCheck 2 times when window is 1', () => {
    totpCheck.mockImplementation(() => false);

    totpCheckWithWindow('', secret, getOptions(1, 1));

    expect(totpCheck).toHaveBeenCalledTimes(2);
  });

  it('time 2, window 1, token 0, called 2, return -1', () => {
    totpCheck.mockImplementation((...args) => {
      return totpCheckOriginal(...args);
    });

    const result = totpCheckWithWindow(token(0), secret, getOptions(2, 1));

    expect(result).toBe(-1);
    expect(totpCheck).toHaveBeenCalledTimes(2);
  });

  it('time 1, window 1, token 1, called 2, return 1', () => {
    totpCheck.mockImplementation((...args) => {
      return totpCheckOriginal(...args);
    });

    const result = totpCheckWithWindow(token(0), secret, getOptions(1, 1));

    expect(result).toBe(1);
    expect(totpCheck).toHaveBeenCalledTimes(2);
  });

  it('time 2, window 2, token 0, called 3, return 2', () => {
    totpCheck.mockImplementation((...args) => {
      return totpCheckOriginal(...args);
    });

    const result = totpCheckWithWindow(token(0), secret, getOptions(2, 2));

    expect(result).toBe(2);
    expect(totpCheck).toHaveBeenCalledTimes(3);
  });
});
