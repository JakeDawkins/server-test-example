const { typeDefs, resolvers } = require('./resolvers');

describe('Query > dog', () => {
  const mockContext = { models: { dog: { getDogByName: jest.fn() } } };

  beforeEach(() => {
    mockContext.models.dog.getDogByName.mockReset();
  });

  it('passes args to getter in dog model', () => {
    resolvers.Query.dog(null, { name: 'Jimothy' }, mockContext);
    expect(mockContext.models.dog.getDogByName).toBeCalledWith('Jimothy');
  });

  it('returns unmodified response from dog model', () => {
    const mockDog = {
      name: 'Jimothy',
      image: 'bologna',
    };
    mockContext.models.dog.getDogByName.mockReturnValueOnce(mockDog);
    const res = resolvers.Query.dog(null, { name: 'Jimothy' }, mockContext);
    expect(res).toEqual(mockDog);
  });
});

describe('Mutation > updateDog', () => {
  const mockContext = { models: { dog: { updateDog: jest.fn() } } };
  const mockDog = { name: 'Harold', image: 'harold.png' };

  beforeEach(() => {
    mockContext.models.dog.updateDog.mockReset();
  });

  it('passes args to updater in dog model', () => {
    mockContext.models.dog.updateDog.mockReturnValueOnce(new Error());

    resolvers.Mutation.updateDog(null, mockDog, mockContext);
    expect(mockContext.models.dog.updateDog).toBeCalledWith(mockDog);
  });

  it('returns success message and dog on success', () => {
    mockContext.models.dog.updateDog.mockReturnValueOnce(mockDog);

    const res = resolvers.Mutation.updateDog(null, mockDog, mockContext);
    expect(res).toEqual({
      success: true,
      message: 'Dog updated successfully',
      dog: mockDog,
    });
  });

  it('returns error message on failure to update', () => {
    mockContext.models.dog.updateDog.mockReturnValueOnce(new Error('oopsie'));

    const res = resolvers.Mutation.updateDog(null, mockDog, mockContext);
    expect(res).toEqual({
      success: false,
      message: 'oopsie',
    });
  });
});
