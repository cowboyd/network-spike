import { create } from 'microstates';

import Store  from '../src/store';
import Factory from '../src/factory';
import expect from 'expect';

describe('Factories', () => {
  describe('creating with static defaults', () => {
    let people
    class Person {
      name = String;
    }
    beforeEach(() => {

      people = create(Store(Person, (attrs) => ({ name: 'Bob' })))
        .create();
    });

    it('adds a person to the people store with the default attributes', () => {
      expect(people.entities[0].name.state).toEqual('Bob');
    });
  });

  describe.skip('creating with higher order defaults');

  describe.skip('creating with overrides');

  describe.skip('creating multiple entities at once');

  describe.skip('creating with relationships');

  describe.skip('creating with overridden relationships');
});
