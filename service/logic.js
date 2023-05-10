//import db.js file

const db = require('./db')


//create a fuunction for register logic

register = (acno, uname, psw) => {
    return db.User.findOne({ acno: acno }).then(User => {
        if (User) {
            return {
                message: "User already exists",
                status: false,
                statusCode: 404
            }

        }
        else {

            newUser = new db.User({
                acno: acno,
                uname: uname,
                pasw: psw,
                balance: 0,
                transactions: []
            })


            newUser.save()


            return {
                message: "Registered successfully",
                status: true,
                statusCode: 200
            }



        }

    })
}





login=(acno,psw)=>{

    return db.User.findOne({acno:acno,pasw:psw}).then(user=>{
        if(user){
            return{
                message: "login successfull",
                status: true,
                statusCode: 200,
                currentUser:user.uname,
                currentAcno:user.acno
            }
        }
        else{

            return{
                message: "Incorrect Password",
                status: false,
                statusCode: 404
            }
        }
    })
}

module.exports={
    register,login
}






