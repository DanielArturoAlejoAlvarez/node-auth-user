const passport=require('passport')

const User=require('../models/User')

const friendlyUrl=require('friendly-url')


const getProfileBySlug=async (req,res)=>{
    const slug=friendlyUrl(req.params.fullName)
    const user=await User.findOne({slug: slug})    
    res.render('users/profile', user)
}

const signIn=async (req,res)=>{
    res.render('users/signin')
}

const postSignIn=passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
})

const signUp=async (req,res)=>{
    res.render('users/signup')
}

const postSignUp=async (req,res)=>{
    const {fullName,email,username,password,confirm_password,avatar,role,state}=req.body
    let errors=[]    
    if(password!=confirm_password){
        errors.push({text: 'Password do not match'})
    }
    if(password.length<4){
        errors.push({text: 'Password must be at least 4 characters'})
    }
    if(errors.length>0){
        res.render('users/signup', {errors,fullName,email,username,password,confirm_password,avatar,filename,role,state})
    }else{
        //res.render('OK!')
        const emailUser=await User.findOne({email: email})
        
        if(emailUser){
            req.flash('error_msg', 'The email is already in use')
            res.redirect('/users/signup')
        }else{
            const newUser=new User(req.body) 
            console.log(req.file)                        
            newUser.avatar=req.file.filename
            newUser.slug=friendlyUrl(req.body.fullName)
            newUser.password=await newUser.encryptPassword(password)
            
            await newUser.save()
            
            req.flash('success_msg', 'You are registered!')
            res.redirect('/users/signin')
        }
    }
}

const logOut=(req,res)=>{
    req.logout()
    res.redirect('/')
}


module.exports={
    getProfileBySlug,
    signIn,
    postSignIn,
    signUp,
    postSignUp,
    logOut
}