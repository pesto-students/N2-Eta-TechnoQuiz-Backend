const router = require('express').Router();
const category = require('../categories/category_map');
const verifyUser = require('../auth/verifyToken');
const difficulty = require('./difficulty_map');
var axios = require('axios');
var validateReq = require('./validation')

router.post('/', verifyUser,async (req,res) => {
    const { error } = validateReq(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const apiUrl = process.env.API_BASE+category[req.body.category]+'&difficulty='+difficulty[req.body.difficulty]+'&limit=10';
    var data = {
        method: 'get',
        url: apiUrl ,
        headers: { 
          'X-Api-Key': process.env.API_TOKEN
        }
      };
    await axios(data)
      .then(function (response) {
        const result = {
            'data'   : response.data.map(function(resp){
                return{
                'id'       : resp.id,
                'question' : resp.question,
                'answers'  : resp.answers,
                'correct'  : resp.correct_answer
                }
            })
        }
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(400).send(error)
      });
});

module.exports = router;