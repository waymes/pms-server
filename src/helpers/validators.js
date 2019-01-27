exports.lengthValidator = (field, length, isMin) => {
  const capitalizedField = `${field.charAt(0).toUpperCase()}${field.slice(1)}`;
  return [length, `${capitalizedField} ${isMin ? 'min' : 'max'} length is ${length}`];
};
