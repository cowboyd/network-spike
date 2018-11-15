import { create, valueOf } from 'microstates';

class Store {
  types = Object;
  ids = create({ Number });
  entities = create({ Object });

  addType(Type) {
    return this
      .ids.put(Type.name, 0)
      .entities.put(Type.name, {})
      .types.put(Type.name, Type);
  }

  createEntity(type, attributes) {
    let id = this.ids[type].state;

    return this
      .ids[type].increment()
      .entities[type].put(id, attributes);
  }
}

const zero = create(Store);

export default zero;

function construct(...entityTypes) {

  return entityTypes.reduce((store, Type) => store.addType(Type), zero);
}

export { construct as Store };
