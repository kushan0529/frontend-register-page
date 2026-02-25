const bcryptjs=require('bcryptjs')
async function register(password){
    const salt=await bcryptjs.genSalt();
    console.log('salt',salt,salt.length);

    const encryptPassword=await bcryptjs.hash(password,salt);
    console.log('pass',encryptPassword,encryptPassword.length)
}
