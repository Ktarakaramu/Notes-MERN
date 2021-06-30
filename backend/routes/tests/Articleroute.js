const express = require('express'); // import express
const articleroute = require('../articleRoute'); //import file we are testing
const request = require('supertest'); // supertest is a framework that allows to easily test web apis

const app = express(); //an instance of an express app, a 'fake' express app
app.use('/articleroute', articleroute); //routes
describe('testing-server-routes', () => {
  it('GET /articleroute - success', async () => {
    const { body } = await request(app).get('/articleroute'); //uses the request function that calls on express app instance
    expect(body).toEqual([
      {
        title: 'title1',
        content: 'content1',
      },
      {
        title: 'title12',
        content: 'content2',
      },
      {
        title: 'title3',
        content: 'content3',
      },
    ]);
  });
});
