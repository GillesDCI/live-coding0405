import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User.js';



const router = express.Router();

//List of all the users 
router.get('/', async (req,res) => {

    const users = await User.find({}).select('firstname lastname'); //.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        //check if there's a password
        if(!password){
            return res.status(400).json({message:'No password supplied'});
        }

        const user = await User.findOne({email:email});

        if(user === null){
            return res.status(400).json({message:"No user found"});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(checkPassword){
            console.log("yaaay authenticated");
            return res.status(200).json({message:'You are authenticated!'});
        } else {
            return res.status(400).json({message:'Passwords not matching'});
        }

    } catch (error) {
        return res.status(400).json({message:'General error upon signing in.'})
    }
});

//creating a new user 
router.post('/register',async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
});


export default router;