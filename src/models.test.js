const models = require('./models');

describe('getDogByName', () => {
  it('returns dog with same name as input', () => {
    const res = models.dog.getDogByName('Jimothy');

    expect(res).toBeDefined();
    expect(res.name).toEqual('Jimothy');
    expect(res.image).toBeDefined();
  });

  // we still need to test these cases,
  // because resolvers could call this this model improperly.
  it('throws error if missing name argument', () => {
    expect(() => models.dog.getDogByName()).toThrow();
  });
});

describe('updateDog', () => {
  it('returns a dog with updated fields', () => {
    const dog = { name: 'Doggo', image: 'http://dog.ceo' };
    expect(models.dog.updateDog(dog)).toEqual(dog);
  });

  it('returns error if missing name or image', () => {
    const update = models.dog.updateDog;

    expect(update({ name: 'Jimothy' }) instanceof Error).toBeTruthy();
    expect(update({ image: 'http://wow.okay' }) instanceof Error).toBeTruthy();
    expect(update() instanceof Error).toBeTruthy();
  });
});
