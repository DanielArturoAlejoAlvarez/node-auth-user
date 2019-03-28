'use strict'
const express=require('express')

const config=require('./config/config')

const app=require('./app')

app.listen(config.port, ()=>{
    console.log(`Server running in port: ${config.port}`)
})