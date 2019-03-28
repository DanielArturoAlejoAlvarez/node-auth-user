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