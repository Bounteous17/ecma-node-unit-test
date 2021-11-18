describe('Logical assignment operator', () => {
  it('&&=', () => {
    let x = 1;
    const y = 2;
    x &&= y;
    expect(x).toBe(2);
  });

  it('||=', () => {
    let x = 1;
    const y = 2;
    x ||= y;
    expect(x).toBe(1);
  });

  it('??=', () => {
    let x;
    const y = 2;
    // eslint-disable-next-line prefer-const
    x ??= y;
    expect(x).toBe(2);
  });
});
