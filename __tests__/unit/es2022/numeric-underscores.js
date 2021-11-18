describe('Underscores as Numeric Separator', () => {
  it('numbers must be the same using numeric separator', () => {
    const billion = 1000_000;
    expect(billion).toBe(1000000);
    /**
     * The separator is just for readability purpose.
     * So, it can be placed anywhere within the number
     */
    expect(178_00).toBe(17800);
  });
});
