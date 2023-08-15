const router = require('express').Router()

const adminRoute = require('./admin/route.js')
const user = require('./user/route.js')
const { isAdmin, AthuVerify } = require('../auth/auth.js')

//Middlewere
// router.use('/admin',AthuVerify,isAdmin,adminRoute)
router.use('/admin',adminRoute)

router.use('/user',user)
//GET


//POST


module.exports=router
