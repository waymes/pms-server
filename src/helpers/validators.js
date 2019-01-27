exports.lengthValidator = (field, length) => {
  const capitalizedField = `${field.charAt(0).toUpperCase()}${field.slice(1)}`;
  return [length, `${capitalizedField} max length is ${length}`];
};
