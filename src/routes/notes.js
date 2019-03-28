const express=require('express')
const router=express.Router()

const NoteCtrl=require('../controllers/notes')

const { isAuthenticated }=require('../helpers/auth')

router.get('/', isAuthenticated, NoteCtrl.getNotesByUserId)

router.get('/new', isAuthenticated, NoteCtrl.newNote)

router.post('/create', isAuthenticated, NoteCtrl.storeNote)

router.get('/edit/:noteId', isAuthenticated, NoteCtrl.editNote)

router.put('/update/:noteId', isAuthenticated, NoteCtrl.updateNote)

router.delete('/delete/:noteId', isAuthenticated, NoteCtrl.deleteNote)

module.exports=router