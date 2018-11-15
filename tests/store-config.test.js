import expect from 'expect';

import store from '../src/store';

describe('Store configuration', () => {
  it('works', () => {

    // let store = Store(Person, Vehicle);

    let withRecords = store
        .addType(class Person {
          name = String
        })
        .addEntity('Person', { name: 'Charles'})



    expect(1).toEqual(1);
  });
});
