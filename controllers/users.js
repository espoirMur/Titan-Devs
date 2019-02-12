import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { hashSync, genSaltSync } from "bcrypt";
let ExtractJwt = require("passport-jwt").ExtractJwt;
const sgMail = require("@sendgrid/mail");
import models from "../models";

dotenv.config();
const { User, VerificationToken } = models;

class UserController {
  static async signUp(req, res) {
    const { email, password, username } = req.body;
    try {
      const salt = await genSaltSync(
        parseFloat(process.env.BCRYPT_HASH_ROUNDS) || 10
      );
      const hashPassword = await hashSync(password, salt);
      const user = await User.create({
        username,
        email,
        password: hashPassword
      });
      sendVerificationEmail(user);
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const { message } = error.errors[0];
        let errorMessage = message;
        if (message === "email must be unique")
          errorMessage = "The email is already taken";
        if (message === "username must be unique")
          errorMessage = "The username is already taken";
        return res.status(409).json({ message: errorMessage });
      }
      res.status(500).json({
        message: "User registration failed, try again later!",
        errors: error.stack
      });
    }
  }
  static confirmation(req, res) {
    try {
      jwt.verify(req.params.auth_token, process.env.SECRET_OR_KEY, async (error, user) => {
        if (error) {
          return res.status(404).json({
            error: error.stack,
            message: "Token is Expired or Invalid signature"
          });
        }
      const verificationToken = await VerificationToken.findOne({
        where:{
          userId:user.id,
        }
      });
      if(!verificationToken){
        return res.status(401).json({
          message: "Invalid Token!"
        });
      }
        // update user
        await User.update(
          { isVerified: true },
          { where: { id: user.id } 
        });
        // // delete token
        await VerificationToken.destroy({
          where:{
            userId:user.id,
          }
        });

        return res.status(200).json({
          message: "Email confirmed successfully!"
        });
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.stack
      });
    } 
  }
}
const sendVerificationEmail = async user => {
  try {
    //create hashed verification token
    const token = jwt.sign(
      {
        id: user.dataValues.id
      },
      process.env.SECRET_OR_KEY
    );
    // saving token in db
    await VerificationToken.create({
      token,
      userId: user.dataValues.id
    });
    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "fabrice.niyomwungeri@andela.com",
      from: "niomwungeri.fabrice@gmail.com",
      subject: "Welcome to Author's Heaven! Confirm Your Email",
      html: `<h1 align='center'>Confirm your email</h1> 
             <br>
             <p><font size="6">One step away the one the greatest author's in the world!</p>
             <p><font size="6">Click the button bellow to confirm</p>
             <br>
             <p>Click <a href="http://localhost:3000/api/v1/users/confirm/${token}">here</a> to reset your password</p>
             <p>${token}<p/>
             `
    };
    sgMail.send(msg);
  } catch (error) {
    console.log(error.stack);
  }
};

export default UserController;
