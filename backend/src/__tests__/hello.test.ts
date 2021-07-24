import hello from '../hello/index'

it('works', () => {
    const greeting = hello('Kong');
    expect(greeting).toBe('Hello Kong');
})
