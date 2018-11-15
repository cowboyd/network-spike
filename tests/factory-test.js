import { create } from 'microstates';

import Store  from '../src/store';
import Factory from '../src/factory';
import expect from 'expect';

const {
  getOwnPropertyNames
} = Object;

describe('Factories', () => {
  let people

  class Person {
    name = String;
  }

  describe('creating with static defaults', () => {
    beforeEach(() => {
      let StoreType = Store(Person, (attrs) => ({ name: 'Bob' }));
      people = create(StoreType).create().create();
    });

    it('adds a person to the people store with the default attributes', () => {
      expect(people.entities[0].name.state).toEqual('Bob');
      expect(people.entities[1].name.state).toEqual('Bob');
    });
  });

  describe('creating with higher order defaults', () => {
    beforeEach(() => {
      let StoreType = Store(Person, (attrs) => ({
        name: (id) => id % 2 ? 'Bob' : 'Bill'
      }));

      people = create(StoreType).create().create();
    });

    it('adds a person to the people store with the default attributes', () => {
      expect(people.entities[0].name.state).toEqual('Bill');
      expect(people.entities[1].name.state).toEqual('Bob');
    });
  });

  describe('creating with overrides', () => {
    beforeEach(() => {
      let StoreType = Store(Person, (attrs) => ({ name: 'Bob' }));
      people = create(StoreType).create({ name: 'Wil' });
    });

    it('adds a person to the people store with overridden attributes', () => {
      expect(people.entities[0].name.state).toEqual('Wil');
    });
  });

  describe('creating multiple entities at once', () => {
    beforeEach(() => {
      let StoreType = Store(Person, (attrs) => ({ name: (id) => `Bob ${id}` }));
      people = create(StoreType).createMany(5);
    });

    it('adds multiple people to the store', () => {
      // entities object does not have enumerable keys
      expect(getOwnPropertyNames(people.entities).length).toEqual(5);
    });

    it('dynamically generates attributes for each person', () => {
      expect(people.entities[0].name.state).toEqual('Bob 0');
      expect(people.entities[1].name.state).toEqual('Bob 1');
      expect(people.entities[2].name.state).toEqual('Bob 2');
      expect(people.entities[3].name.state).toEqual('Bob 3');
      expect(people.entities[4].name.state).toEqual('Bob 4');
    });
  });

  describe('creating with relationships', () => {

    class Person {
      name = String;

      motherId = String;
      fatherId = String;

      get mother() {
        return people(this).entities[this.motherId.state];
      }

      get father() {
        return people(this).entities[this.fatherId.state];
      }
    }

    beforeEach(() => {
      let StoreType = Store(Person, (attrs) => ({ name: `Bob` }));
      people = create(StoreType)
        .create();
    });

    it('adds a person with relationships', () => {

    });
  });

  describe.skip('creating with overridden relationships');
});
