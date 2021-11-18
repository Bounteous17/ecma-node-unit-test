describe('Promise.any', () => {
  it('should resolve one of the promises', async () => {
    // Randomly one of the promises must be resolved at some time
    const p1 = new Promise((resolve) => {
      setTimeout(() => resolve('A'), Math.floor(Math.random() * 1000));
    });
    const p2 = new Promise((resolve) => {
      setTimeout(() => resolve('B'), Math.floor(Math.random() * 1000));
    });
    const p3 = new Promise((resolve) => {
      setTimeout(() => resolve('C'), Math.floor(Math.random() * 1000));
    });
    // Calling all the promises
    const result = await Promise.any([p1, p2, p3]);
    // The first resolved promise nust return some of the expected values
    expect(['A', 'B', 'C']).toEqual(expect.arrayContaining([result]));
  });

  it('should reject some of the promises', async () => {
    // This promise will always fail
    const p = new Promise((resolve, reject) => { reject(); });
    expect(
      async () => Promise.any([p]),
    ).rejects.toThrow('All promises were rejected');
  });
});
