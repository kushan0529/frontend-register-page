const bcryptjs=require('bcryptjs');

async function loginUser(password){
    const hashpassword='$2b$10$nViQJJOy.Bzw92ec.xB3/umjoW8laQi9EMpYWFfHkTFAlyQ3M4qr2'
    const salt=hashpassword.slice(0,29); // extract the salt
    console.log(salt);
    const newHashpassword=await bcryptjs.hash(password,salt); // generate a new hash form the extracted salt
    if(newHashpassword == hashpassword){
        console.log('valid');
    } else{
        console.log('in-valid');
    }
}
//actuall code with abstracted
//const isMatch=await bcryptjs.compare(password,hashpassword);
//console.log(isMatch)
console.log(loginUser('kkk'))