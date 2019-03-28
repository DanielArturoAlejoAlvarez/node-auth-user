'use strict'

const express=require('express')

const path=require('path')

const router=express.Router()

const {isAuthenticated}=require('../helpers/auth')

const UserCtrl=require('../controllers/users')
const upload=require('../upload')

router.get('/profile/:slug', isAuthenticated, UserCtrl.getProfileBySlug)

router.get('/signin', UserCtrl.signIn)

router.post('/signin', UserCtrl.postSignIn)

router.get('/signup', UserCtrl.signUp)

router.post('/signup', upload.single('avatar'), UserCtrl.postSignUp)

router.get('/logout', UserCtrl.logOut)

module.exports=router