const router = require('express').Router();
const category = require('../categories/category_map');
const verifyUser = require('../auth/verifyToken');
const difficulty = require('../quiz/difficulty_map');
const mongoose = require('mongoose');
const validateScore = require('./validation');
const User = require('../../models/user');

router.post('/',verifyUser,(req,res)=>{
    const { error } = validateScore(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    res.send("ROute Working")

})




module.exports = router;