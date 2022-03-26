const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
    res.send("landing/index")
})

module.exports = router; 
