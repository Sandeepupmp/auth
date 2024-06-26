import User from "../modulse/user.module.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const singupControler = async (req, res, next)=>{
   const {username, email, password} = req.body
   const hashpassword = bcryptjs.hashSync(password,10)
   const newUser = new User({username, email, password:hashpassword})
   try {
    await newUser.save();
    res.status(201).send({message:"new user created success"})
   } catch (error) {
    next(error)
   }
}

export const signin = async (req, res, next) => {
   const { email, password } = req.body;
   try {
     const validUser = await User.findOne({ email });
     if (!validUser) return next(errorHandler(404, 'User not found'));
     const validPassword = bcryptjs.compareSync(password, validUser.password);
     if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
     const { password: hashedPassword, ...rest } = validUser._doc;
     const expiryDate = new Date(Date.now() + 3600000); // 1 hour
     res
       .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
       .status(200)
       .json(rest);
   } catch (error) {
     next(error);
   }
 };