class Store {

  addType(Type) {

  }

  addEntity
}

const zero = new Store();

export default gzero;

function construct(...entityTypes) {
  return entityTypes.reduce((store, Type) => store.addType(Type), zero);
}

export { construct as Store };
