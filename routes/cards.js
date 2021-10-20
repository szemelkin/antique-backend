const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getCards,
  deleteCardById,
  createCard,
  renewLotStatus,
  getLotById,
  renewAllDataOfLot,
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
      investorId: Joi.string().hex().length(24),
      revenueFromLot: Joi.number(),
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

router.get('/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  getLotById);

router.patch('/renewStatus/:cardId',
  celebrate({
    body: Joi.object().keys({
      investorId: Joi.string().hex().length(24),
      status: Joi.string(),
    }),
  }),
  renewLotStatus);

// Админка: Сохраняем все изменеия в карточке
router.patch('/renewAllData/:cardId',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string(),
      description: Joi.string(),
      investPrice: Joi.number(),
      sellPrice: Joi.number(),
      revenueFromLot: Joi.number(),
      // investorId: Joi.number(),
      status: Joi.string(),
      lotId: Joi.number(),
    }),
  }),
  renewAllDataOfLot);

module.exports = router;
