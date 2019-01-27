const boom = require('boom');
const Person = require('../../models/Person');

exports.listMyPeople = (req, res) => {
  Person.find({ createdBy: req.user._id }).then(people => {
    res.status(200).send(people);
  });
};

exports.get = (req, res, next) => {
  Person.findById(req.params.personId, (err, person) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!person) return next(boom.notFound('Person not found'));

    return res.status(200).send(person);
  });
};

exports.create = (req, res, next) => {
  const { firstName, lastName, email, city, relation } = req.body;
  const personFields = { firstName, lastName, email, city, relation };
  const person = new Person({ ...personFields, createdBy: req.user._id });

  person.save(err => {
    if (err) return next(boom.badImplementation(null, err));

    return res.status(201).json(person);
  });
};

exports.update = (req, res, next) => {
  const { firstName, lastName, email, city, relation } = req.body;

  const where = { _id: req.params.personId };
  const personFields = { firstName, lastName, email, city, relation };
  const options = { runValidators: true };
  Person.findOneAndUpdate(where, personFields, options, (err, person) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!person) return next(boom.notFound('Person not found'));

    return res.sendStatus(204);
  });
};

exports.delete = (req, res, next) => {
  const where = { _id: req.params.personId };
  Person.findByIdAndDelete(where, (err, person) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!person) return next(boom.notFound('Person not found'));

    return res.sendStatus(204);
  });
};
