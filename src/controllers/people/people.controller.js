const boom = require('boom');
const Person = require('../../models/Person');

exports.listMyPeople = (req, res) => {
  Person.find({ createdBy: req.user._id }).then(people => {
    res.status(200).send(people);
  });
};

exports.get = (req, res, next) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!person) return next(boom.notFound('Person not found'));

    return res.status(200).send(person);
  });
};

exports.create = (req, res, next) => {
  const { firstName, lastName } = req.body;
  const person = new Person({ firstName, lastName, createdBy: req.user._id });

  person.save(err => {
    if (err) return next(boom.badImplementation(null, err));

    return res.status(201).json(person);
  });
};
