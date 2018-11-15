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
      let People = Store(Person, (attrs) => ({ name: 'Bob' }));
      people = create(People).createRecord().createRecord();
    });

    it('adds a person to the people store with the default attributes', () => {
      expect(people.records[0].name.state).toEqual('Bob');
      expect(people.records[1].name.state).toEqual('Bob');
    });
  });

  describe('creating with higher order defaults', () => {
    beforeEach(() => {
      let People = Store(Person, (attrs) => ({
        name: (id) => id % 2 ? 'Bob' : 'Bill'
      }));

      people = create(People).createRecord().createRecord();
    });

    it('adds a person to the people store with the default attributes', () => {
      expect(people.records[0].name.state).toEqual('Bill');
      expect(people.records[1].name.state).toEqual('Bob');
    });
  });

  describe('creating with overrides', () => {
    beforeEach(() => {
      let People = Store(Person, (attrs) => ({ name: 'Bob' }));
      people = create(People).createRecord({ name: 'Wil' });
    });

    it('adds a person to the people store with overridden attributes', () => {
      expect(people.records[0].name.state).toEqual('Wil');
    });
  });

  describe('creating multiple records at once', () => {
    beforeEach(() => {
      let People = Store(Person, (attrs) => ({ name: (id) => `Bob ${id}` }));
      people = create(People).createRecords(5);
    });

    it('adds multiple people to the store', () => {
      // records object does not have enumerable keys
      expect(getOwnPropertyNames(people.records).length).toEqual(5);
    });

    it('dynamically generates attributes for each person', () => {
      expect(people.records[0].name.state).toEqual('Bob 0');
      expect(people.records[1].name.state).toEqual('Bob 1');
      expect(people.records[2].name.state).toEqual('Bob 2');
      expect(people.records[3].name.state).toEqual('Bob 3');
      expect(people.records[4].name.state).toEqual('Bob 4');
    });
  });

  describe('creating with relationships', () => {

    class Person {
      name = String;

      motherId = String;
      fatherId = String;

      get mother() {
        return people(this).records[this.motherId.state];
      }

      get father() {
        return people(this).records[this.fatherId.state];
      }
    }

    beforeEach(() => {
      let People = Store(Person, (attrs) => ({ name: `Bob` }));
      people = create(People);
    });

    describe('creating with null relationships', () => {
      beforeEach(() => {
        people = people.createRecord();
      });

      it('adds a person without parents', () => {
        expect(people.records[0].mother).toEqual(null);
        expect(people.records[0].father).toEqual(null);
      });
    });

    describe('creating with relationships' , () => {
      beforeEach(() => {
        people = people.createRecord({
          mother: { name: 'Bobbie' },
          father: { name: 'Bobby' }
        });
      });

      it('adds a person with parents', () => {
        expect(people.records[0].mother.name.state).toEqual('Bob');
        expect(people.records[0].father.name.state).toEqual('Bob');
      });
    });

    describe('creating relationships that are reused', () => {
      beforeEach(() => {
        people = people.createRecord({
          mother(attrs, store) {
            let [mother] = filter(store.people.records, person => person.name === attrs.name);
            if (mother) {
              return mother;
            } else {
              let withMother = store.people.createRecord(attrs);
              let [mother] = filter(withMother.people.records, person => person.name === attrs.name);
              return mother;
            }
          }
        })
      });
    })
  });

});
