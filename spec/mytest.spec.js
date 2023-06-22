const supertest = require('supertest');
const app = require('../hi');
const request = supertest(app);

describe('Book API', () => {
  let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
  ];

  describe('GET /books', () => {
    it('should return the list of books', async () => {
      const response = await request.get('/books');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(books);
    });
  });

  describe('POST /books', () => {
    it('should add a new book to the list', async () => {
      const newBook = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
      const response = await request.post('/books').send(newBook);
      expect(response.status).toEqual(200);
      expect(response.body.title).toEqual(newBook.title);
      expect(response.body.author).toEqual(newBook.author);
      expect(response.body.id).toBeDefined();
      books.push(response.body); // Add the new book to the list for subsequent tests
    });
  });

  describe('POST /books', () => {
    it('should return an error when adding a book without a title', async () => {
      const newBook = { author: 'J.D. Salinger' };
      const response = await request.post('/books').send(newBook);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('Title is required');
    });
  });
});