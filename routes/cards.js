const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getCards,
  deleteCardById,
  createCard,
} = require('../controllers/cards');

router.use(auth);

router.get('/', getCards);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string(),
      director: Joi.string(),
      duration: Joi.number(),
      year: Joi.number(),
      description: Joi.string().min(2).max(2000),
      image: Joi.string(),
      trailer: Joi.string(),
      thumbnail: Joi.string(),
      cardId: Joi.number(),
      nameRU: Joi.string(),
      nameEN: Joi.string(),
    }),
  }),
  createCard);

router.delete('/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCardById);

module.exports = router;
