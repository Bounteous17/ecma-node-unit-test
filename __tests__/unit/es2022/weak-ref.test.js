const { setTimeout } = require('timers/promises');

describe('WeakRef', () => {
  it('the garbage collector must act after some seconds', async () => {
    const cachedObject = new WeakRef({
      name: 'Some tmp cached data',
    });
    /**
     * After calling .deref() is just possible that the garbage collector reclaim some memory.
     * The consequence is an undefined returned value.
     */
    const getWeakRefValue = () => cachedObject.deref()?.name;
    expect(getWeakRefValue()).toEqual('Some tmp cached data');
    // Force garbage collector to initiate
    global.gc();
    // At some moment the garbage collector will clean the reference
    while (getWeakRefValue()) {
      // eslint-disable-next-line no-await-in-loop
      await setTimeout(1_000);
    }
    // Finally garbage collector acted
    expect(getWeakRefValue()).toBeFalsy();
  });
});
