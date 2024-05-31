const Book = require('../models/book_models');
const sequelize = require('../config/database_config');

const books = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];

const seedBooks = async () => {
  try {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(books);
    console.log('Books seeded successfully');
  } catch (error) {
    console.error('Error seeding books:', error);
  } finally {
    await sequelize.close();
  }
};

seedBooks();
