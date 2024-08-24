const user = require('../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        const { name, email, phone, primaryId, password } = req.body;
        if (!name || !email || !phone || !primaryId || !password) {
            return res.status(400).json({ message: 'Fields are required: name, email, phone, profile type & password' });
        }

        const existing = await user.findOne({ email: email });
        if (existing) {
           return res.status(400).json({ message: "User already exist." });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new user({ name, email, phone, password: hashPassword, primaryId });

        await newUser.save();
        const token = jwt.sign({ id: newUser.id, email: newUser.email, phone: newUser.phone }, 'rahman', { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: "user successfully register.",
            user: newUser,
            token: token,
        });

    } catch (error) {
        return res.status(500).json({ message: `failed to register due to ${error.message}` });
    }
};


const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
    const existing = await user.findOne({email: email});
    if (!existing) {
        return res.status(404).json({
            message: 'No user found.'
        });
    }
    const hashPassword = bcrypt.compare(password, existing.password);
    if (!hashPassword) {
        return res.status(404).json({message: 'password does not matched.'});
    }
    const token = jwt.sign({id: existing.id, email: existing.email, phone: existing.phone},'rahman',{ expiresIn: '1d' });
    res.status(200).json({
        success: true,
        message: 'login successfully',
        token: token,
    })
    } catch (error){
        return res.status(500).json({
            message: `failed to login ${error.message}`
        });
    }
}

const sendConde = async (req, res, next) => { }

const resendConde = async (req, res, next) => { }

const verifyCode = async (req, res, next) => { }

const generatePassword = async (req, res, next) => { }

const resetPassword = async (req, res, next) => {}


module.exports = { register, login, sendConde, resendConde, verifyCode, generatePassword,resetPassword };