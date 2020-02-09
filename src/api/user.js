const User = require('../db/models/user');

exports.addUser = ({name, surname, email, password}) => new Promise(async (resolve, reject) => {
        try{
            if (!name || !surname || !email || !password) {
                resolve({
                    success: false,
                    massege: 'dont add user need correct data'
                })
                return;
            }
            console.log(name, surname, email, password)
            const newUser = new User({
                name,
                surname,
                email,
                password
            })
    
            checkUserEmail = await User.find({email: email}).limit(1);
            console.log(checkUserEmail)
            if (checkUserEmail[0]) {
                resolve({
                    success: false,
                    massege: 'Этот уже email зареган', 
                })
            };
            
            const user = await newUser.save();
                resolve(user)

        }catch(e){
            reject(e)
        }
})

exports.login = ({email, password}) => new Promise(async (resolve) => {

    if (!email || !password) {
        resolve({
            success: false,
            massege: 'User dont exist'
        })
        return;
    }
    
    const user = await User.find({email: email});
    if (user[0].checkPassword(password)) {
        resolve(user[0])
    }
})

exports.getUser = ({id}) => new Promise(async (resolve, reject) => {
    try{
        if (!id) {
            resolve({
                success: false,
                massege: 'User dont exist'
            })
            return;
        }

        const user = await User.findById(id);

        if (!user) {
            resolve({
                success: true,
                date: 'user not found'
            })
        }

        resolve({
            success: true,
            date: user
        })

    }catch(e){
        reject(e)
    }
})

exports.getUsers = () => new Promise(async (resolve, reject) => {
    try{
        const users = await User.find({}, {_id:0});
      
        if (!users) {
            resolve({
                success: true,
                date: 'user not found'
            })
            return
        }

        resolve({
            success: true,
            date: users
        })

    }catch(e){
        reject(e)
    }
})