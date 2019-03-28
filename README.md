# NODE-AUTH-USER
## Description

Software of Development to Authentication of users with NodeJS, MongoDB, Handlebars, Passport, Bcrypt, etc.

## Installation
Using Nodejs v10.3, Express, Mongoose preferably.

## DataBase
Using MongoDB preferably.

## Apps
Using Postman or RestEasy to feed the api.

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/node-auth-user.git [NAME APP] 

$ npm install

$ npm run dev
```
Follow the following steps and you're good to go! Important:


![alt text](https://raw.githubusercontent.com/codekirei/node-multispinner/master/extras/demo.gif)

## Coding

### Controllers
```javascript
...
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
...
```

### Models
```javascript
const DB=require('../config/database')

const Schema=DB.Schema 

const NoteSchema=new Schema({
    name: {type: String, required: true},
    task: {type: String, required: true},
    dateRegister: {type: Date, default: Date.now()},
    user: {type: String} 
})

module.exports=DB.model('Note', NoteSchema)
```

### Database
```javascript
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

```

### Helpers
```javascript
const bcrypt=require('bcryptjs')

module.exports={
    isEncryptPassword: async (password)=>{
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        return hash
    },
    isMatchPassword: async function(password){
        return await bcrypt.compare(password, this.password)
    }
}
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/node-auth-user. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

