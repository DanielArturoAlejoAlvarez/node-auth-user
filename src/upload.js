const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req,file,cb)=>{
        newFile=Date.now() + '_' + file.originalname.toLowerCase().replace(/\+s/g,'-').replace(/-/gi,'') 
        cb(null,newFile)
        console.log(newFile)
    }    
})


const upload=multer({
    storage,
    fileFilter: (req, file, cb)=>{

        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  

        
        if (mimetype && extname) {
          return cb(null, true)
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);        
      }
})

module.exports=upload