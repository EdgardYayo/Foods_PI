const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Gran receta con increible sabor'})
      })
    })
  });
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('healthScore', () => {
      it('should throw an error if healthScore is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid healthScore')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ healthScore: 95 })
      })
    })
  });
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('steps', () => {
      it('It should throw an error if steps is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid steps')))
          .catch(() => done())
      })
      it('should work when is a valid steps', () => {
        Recipe.create({ steps: '1.Macerar, 2.Hervir agua, 3.Saltear las verduras'})
      })
    })
  })

});
