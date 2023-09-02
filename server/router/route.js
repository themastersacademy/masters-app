const router = require('express').Router()
const adminRoute = require('./admin/route.js')
const user = require('./user/route.js')
const { isAdmin, AthuVerify } = require('../auth/auth.js')
const exam = require('./exam/route.js')
const {routerControl} = require('../auth/auth.js')

//Middlewere
// router.use('/admin',AthuVerify,isAdmin,adminRoute)
router.use('/admin',routerControl,adminRoute)

router.use('/user',user)

router.use('/exam',routerControl,exam)
//GET


//POST


module.exports=router
