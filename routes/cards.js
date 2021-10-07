const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getCards,
  deleteCardById,
  createCard,
  renewLotStatus,
} = require('../controllers/cards');

router.use(auth);

router.get('/', getCards);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string(),
      description: Joi.string(),
      image: Joi.array().items(Joi.string()),
      investPrice: Joi.number(),
      sellPrice: Joi.number(),
      investorId: Joi.number(),
      status: Joi.string(),
      lotId: Joi.number(),
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

router.patch('/renewStatus/:cardId',
  celebrate({
    body: Joi.object().keys({
      investorId: Joi.number(),
      status: Joi.string(),
    }),
  }),
  renewLotStatus);

module.exports = router;
