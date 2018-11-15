import { create, valueOf } from 'microstates';
import { append, map } from 'funcadelic';

export default function Store(Type, factory = (attrs) => attrs) {
  return class Store {
    nextId = Number;
    entities = create({ Type });

    create(overrides = {}) {
      let id = this.nextId.state;

      let attrs = map((attr) => {
        if (typeof attr === 'function') {
          return attr(id);
        } else {
          return attr;
        }
      }, append(factory(), overrides));

      return this
        .nextId.increment()
        .entities.put(id, attrs);
    }

    createMany(amount, overrides) {
      let result = this;

      for (let i = 0; i < amount; i++) {
        result = result.create(overrides);
      }

      return result;
    }
  };
}

// class Store {
//   types = Object;
//   ids = create({ Number });
//   entities = create({ Object });

//   addType(Type) {
//     return this
//       .ids.put(Type.name, 0)
//       .entities.put(Type.name, {})
//       .types.put(Type.name, Type);
//   }

//   createEntity(type, attributes) {
//     let id = this.ids[type].state;

//     return this
//       .ids[type].increment()
//       .entities[type].put(id, attributes);
//   }
// }

// const zero = create(Store);

// export default zero;

// function construct(...entityTypes) {

//   return entityTypes.reduce((store, Type) => store.addType(Type), zero);
// }

// export { construct as Store };
