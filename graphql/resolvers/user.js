const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    createUser: async args=>{
        try{
            const existingUser = await User.findOne({email: args.inputUser.email});
            if(existingUser){
                throw new Error('User exist already!');
            }

            const hashedPassword = await bcrypt.hash(args.inputUser.password, 12);

            const user = new User({
                email: args.inputUser.email,
                password: hashedPassword
            });
            
            
            const result = await user.save();

            return {...result._doc, password: null, _id:result.id};

        }catch(err){
            throw err;
        }
    },
    user: async (args, req)=>{
        if (!req.isAuth) {
            throw new Error('Unauthorized!');
          }

        try{
            const user = await User.findOne({email: args.email});
            if(!user){
                throw new Error('User not found');
            }

            if(req.userId != user.id){
                throw new Error('You are not authorized to see this');
            }

            return {...user._doc, password: null, id: user.id};
        }catch(err){
            throw err;
        }
    },
    login: async ({email, password})=>{
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('User doesnt exist');
        }
        
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password wrong');
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        },
        'KEYrCXF5Tm12t',
        {
            expiresIn: '1h'
        });

        return{userId: user.id, token:token, tokenExpiration: 1};
    },
  };