const Note=require('../models/Note')

const getNotesByUserId=async(req,res)=>{
    const notes=await Note.find({user: req.user.id}).sort({date: 'desc'})
    res.render('notes/index', {notes})
}

const newNote=async (req,res)=>{
    res.render('notes/new')
}

const storeNote=async (req,res)=>{
    const {name,task}=req.body
    const errors=[]
    if(!name){
        errors.push({text: 'Please write a title'})
    }
    if(!task){
        errors.push({text: 'Please write a task'})
    }
    if(errors.length>0){
        res.render('notes/new', {errors,name,task})
    }else{
        const newNote=new Note(req.body)
        newNote.user=req.user.id
        await newNote.save()
        req.flash('success_msg', 'Note added successfully!')
        res.redirect('/notes')
    }
}

const editNote=async (req,res)=>{
    const {noteId}=req.params
    const note = await Note.findById(noteId)
    if(note.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized')
      return res.redirect('/notes')
    } 
    res.render('notes/edit',  {note})
}

const updateNote=async (req,res)=>{
    const {noteId}=req.params
    const newNote=req.body
    const oldNote=await Note.findByIdAndUpdate(noteId, newNote)
    req.flash('success_msg', 'Note updated successfully!')
    res.redirect('/notes')
}

const deleteNote=async (req,res)=>{
    const {noteId}=req.params
    await Note.findByIdAndRemove(noteId)
    req.flash('success_msg', 'Note deleted successfully!')
    res.redirect('/notes')
}

module.exports={
    getNotesByUserId,
    newNote,
    storeNote,
    editNote,
    updateNote,
    deleteNote
}