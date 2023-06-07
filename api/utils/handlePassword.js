const bcrypts = require('bcryptjs');

const encrypt =async(passwordPlain)=>{
    const hash = await bcrypts.hash(passwordPlain, 10)
    return hash
}
const compare=async(passwordPlain,hashPassword)=>{
    return await bcrypts.compare(passwordPlain,hashPassword)
}

module.exports= {encrypt,compare}