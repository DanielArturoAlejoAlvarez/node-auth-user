'use strict'

const DB=require('../config/database')

const Schema=DB.Schema 

const NoteSchema=new Schema({
    name: {type: String, required: true},
    task: {type: String, required: true},
    dateRegister: {type: Date, default: Date.now()},
    user: {type: String} 
})


module.exports=DB.model('Note', NoteSchema)