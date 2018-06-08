// sample models for testing
const models = {
  dog: {
    getDogByName: name => {
      if (!name) throw new Error('Missing name');

      return {
        name,
        image: 'https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg',
      };
    },
    updateDog: dog => {
      if (!dog || !dog.name || !dog.image)
        return new Error('Missing name or image');
      return { name: dog.name, image: dog.image };
    },
  },
};

module.exports = models;
