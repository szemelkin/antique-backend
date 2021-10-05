const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      let error;
      if (err.name === 'CastError') {
        error = new ValidationError('Переданы некорректные данные');
      }
      next(error);
    });
};

function deleteCardById(req, res, next) {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(cardId)
          .orFail()
          .then((cardWithHash) => {
            res.send(cardWithHash);
          })
          .catch((err) => {
            let error2;
            if (err.name === 'CastError') {
              error2 = new ValidationError('Не валидный _id');
            } else if (err.name === 'DocumentNotFoundError') {
              error2 = new NotFoundError('Карточка не найдена');
            } else {
              error2 = new DefaultError('Ошибка по умолчанию');
            }
            next(error2);
          });
      }
      return next(new ForbiddenError('Можно удалять только свои карточки'));
    })
    .catch((err) => {
      let error;
      if (err.name === 'CastError') {
        error = new ValidationError('Не валидный _id');
      } else if (err.name === 'DocumentNotFoundError') {
        error = new NotFoundError('Карточка не найдена');
      } else {
        error = new DefaultError('Ошибка по умолчанию');
      }
      next(error);
    });
}

const createCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    cardId,
    nameRU,
    nameEN,
  } = req.body;
  Card.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    cardId,
    nameRU,
    nameEN,
    owner: req.user._id,
  }).then((card) => {
    res.send(card);
  })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new ValidationError('Переданы некорректные данные');
      } else {
        error = new DefaultError('Ошибка по умолчанию');
      }
      next(error);
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
};