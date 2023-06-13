//import db.js file

const db = require('./db')

//import jwt
const jwt = require('jsonwebtoken')


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





login = (acno, psw) => {

    return db.User.findOne({ acno: acno, pasw: psw }).then(user => {
        if (user) {

            const token = jwt.sign({ currentAcno: acno }, "secretkey123")

            return {
                message: "login successfull",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                currentAcno: user.acno,
                token: token
            }
        }
        else {

            return {
                message: "Incorrect Accountnumber or Password",
                status: false,
                statusCode: 404
            }
        }
    })
}




getBalance = acno => {
    return db.User.findOne({ acno: acno }).then(user => {
        if (user) {
            return {
                message: user.balance,
                status: true,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "Incorrect Account number",
                status: false,
                statusCode: 404
            }
        }
    })
}





getUser = acno => {
    return db.User.findOne({ acno: acno }).then(user => {
        if (user) {
            return {
                message: user,
                status: true,
                statusCode: 200,
            }
        }
        else {
            return {
                message: "Incorrect Account number",
                status: false,
                statusCode: 404
            }
        }
    })
}



fundTransfer = (toAcno, fromAcno, amount, psw, date) => {
    let amnt = parseInt(amount)
    return db.User.findOne({ acno: fromAcno, pasw: psw }).then(result => {
        if (result) {
            return db.User.findOne({ acno: toAcno }).then(data => {
                if (data) {
                    if (amnt > result.balance) {
                        return {
                            message: "Insufficeint balance",
                            status: false,
                            statusCode: 404
                        }
                    }
                    else {
                        result.balance = result.balance - amnt
                        result.transactions.push(
                            {
                                type: "DEBIT",
                                amount: amnt,
                                date: date
                            }
                        )
                        result.save()

                        data.balance = data.balance + amnt
                        data.transactions.push(
                            {
                                type: "CREDIT",
                                amount: amnt,
                                date: date
                            }
                        )
                        data.save()


                        return {
                            message: "transaction successfull",
                            status: true,
                            statusCode: 200,
                            newBalance: result.balance
                        }
                    }
                }
                else {
                    return {
                        message: "Invalid credit credential",
                        status: false,
                        statusCode: 404
                    }
                }
            })
        }
        else {
            return {
                message: "Invalid debit credential",
                status: false,
                statusCode: 404
            }
        }
    })
}





getTransaction = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                message: user.transactions,
                status: true,
                statusCode: 200

            }

        }
        else {
            return {
                message: "Invalid user",
                status: false,
                statusCode: 404
            }
        }
    })
}








deleteAc = (acno) => {
    return db.User.deleteOne({ acno }).then(deleteCount => {
        if (deleteCount) {
            return {
                message: "user deleted",
                status: true,
                statusCode: 200

            }
        }
        else {
            return {
                message: "Invalid user",
                status: false,
                statusCode: 404
            }
        }
    })
}





module.exports = {
    register, login, getBalance, getUser, fundTransfer,
    getTransaction, deleteAc
}







