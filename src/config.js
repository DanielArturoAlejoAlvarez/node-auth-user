module.exports={
    port: process.env.PORT || 3000,
    dbURL: process.env.MONGO_URI || 'mongodb://127.0.0.1/notebookdb',
    secretKEY: process.env.SECRET_KEY || 's$g9tggon0.oz1h0e_tn1ubyyfj$3y$ik4e20jdkh2y4s32w',
}