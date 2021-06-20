/* eslint-disable consistent-return */
const router = require('express').Router();
const axios = require('axios');
const { categoryMap } = require('../categories/category_map');
const verifyUser = require('../auth/verifyToken');
const difficulty = require('./difficulty_map');
const validateReq = require('./validation');

router.post('/', verifyUser, async (req, res) => {
  const { error } = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const apiUrl = `${process.env.QAPI_BASE + categoryMap[req.body.category]}&difficulty=${difficulty[req.body.difficulty]}&limit=10`;
  const data = {
    method: 'get',
    url: apiUrl,
    headers: {
      'X-Api-Key': process.env.QAPI_TOKEN,
    },
  };
  await axios(data)
    .then((response) => {
      const result = {
        data: response.data.map((resp) => ({
          id: resp.id,
          question: resp.question,
          answers: resp.answers,
          correct: resp.correct_answers,
        })),
      };
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
