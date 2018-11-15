import expect from 'expect';
import { valueOf } from 'microstates';

import store from '../src/store';

describe('Store configuration', () => {
  let withRecords;

  beforeEach(() => {
    withRecords = store
      .addType(class Person {
        name = String
      })
      .createEntity('Person', {
        name: 'Charles'
      })
      .createEntity('Person', {
        name: 'Wil'
      })
  });

  it('works', () => {
    expect(valueOf(withRecords.entities)).toEqual({
      Person: {
        0: { name: 'Charles' },
        1: { name: 'Wil' }
      }
    })
  });
});
