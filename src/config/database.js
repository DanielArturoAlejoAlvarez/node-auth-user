'use strict'

const database=require('mongoose')
const config=require('./config')

database.connect(config.dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db=>console.log('DB connect!'))
.catch(err=>console.error(err))

module.exports=database

