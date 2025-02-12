import { User } from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const regToken = (user_id) => {
    return jwt.sign({ user_id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //Check if user exists or not..
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        //Check if password is correct
        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            return res.json({
                success: false,
                message: 'Invalid password'
            });
        }

        //Sign a token
        const token = regToken(user._id);
        return res.json({
            success: true,
            message: 'User logged in successfully',
            token
        });


    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred',
        });
    }

};

export const regUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists'
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please enter a valid email'
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Please enter a strong password'
            });
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        //Save the user
        const user = newUser.save();

        //Sign a token
        const token = regToken(user._id);

        return res.json({
            success: true,
            message: 'User registered successfully',
            token
        })

    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred'
        });
    }
};

export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({
                success: true,
                token
            });
        }

        else {
            return res.json({
                sucess: false,
                message: 'Invalid credentials'
            });
        }

    }
    catch (err) {
        return res.json({
            sucess: false,
            message: err.message
        });
    }
};