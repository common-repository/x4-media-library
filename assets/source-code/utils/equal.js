export default {

  arrays(array1, array2, key) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (key) {
        if (array1[i][key] !== array2[i][key]) {
          return false;
        }
      } else {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
    }

    return true;
  },


  objects(object1, object2, key) {
    let array1 = Object.values(object1);
    let array2 = Object.values(object2);

    return this.arrays(array1, array2, key);
  },

};
