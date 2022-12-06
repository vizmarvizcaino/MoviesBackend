import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    if (!req.body.nombres || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "email, password and name are required"
      });
    }

    if (req.body.nombres.length <= 3 || req.body.password.length <= 4) {
      return res.status(400).send({
        message: "password must be at least 4 characters"
      });
    }

    if (!req.body.email.includes('@')) {
      return res.status(400).send({
        message: "email must contain @ character"
      });
    }

    const validaCorreo = (correo) =>{ 
      let expReg =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let esValido = expReg.test(correo);
      if (esValido === false) {
        return res.status(400).send({
          message: "the email is not valid"
        })
      }
    };
    validaCorreo(req.body.email);

    const validaPassword = (password) =>{ 
      let expReg =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
      let esValido = expReg.test(password);
      if (esValido === false) {
        return res.status(400).send({
          message: "the password is not valid"
      });
      }
    };
    validaPassword(req.body.password);
    
    const {nombres, email, password} = req.body;
    const user = await User.create({
      nombres,
      email,
      password: bcrypt.hashSync(password, 8)
    });
    res.status(201).json({
      "message": "User Created",
      "userId": user.id
    });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  console.log('este es ',req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).send({
        message: `No user found with email ${req.body.email}`
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
  
    if (!passwordIsValid) {
      return res.status(401)
        .send({
          message: "Invalid Password" 
        });
    }

    const token = jwt.sign({
      id: user.id,
      name: user.name,
    }, 'secret-key', {
      expiresIn: 86400
    });

    res.status(200)
      .send({
        user: {
          id: user.id,
          email: user.email,
          nombres: user.nombres,
          message: "Login successfull",
          accessToken: token,
        },
      });
  } catch (err) {
    console.log(err);
  }
};
