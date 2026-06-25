const asyncHandler = require('express-async-handler');
const Models = require('../models');
const User = Models.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Validator = require('fastest-validator');
const { Op } = require('sequelize');
const fs = require('fs');
const moment = require('moment');
const passwordValidator = require('password-validator');
const {
  transporter,
  forgotPasswordOtpTemp,
  accountActivationTemp,
} = require('../config/mail.config.js');
const ejs = require('ejs');
const crypto = require('crypto');

// @desc register
// @route POST /api/user/register
// @access Private
// @Author Suvadip Maiti
const register = asyncHandler(async (req, res) => {
  var username = 'SmartCalcTools' + Date.now();
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  var activationToken = crypto.randomBytes(20).toString('hex');
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,
      activationToken: activationToken,
    },
    {
      name: { type: 'string', empty: false, max: '100' },
      email: { type: 'string', empty: false, max: '100' },
      password: { type: 'string', empty: false, max: '100' },
      cpassword: { type: 'string', empty: false, max: '100' },
      activationToken: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  const passwordSchema = new passwordValidator();
  // Add password validation rules
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols(); // Must have symbols
  // Middleware function to check if a password is strong
  if (!passwordSchema.validate(password)) {
    return res.status(400).json({
      status: false,
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }
  //   validation end
  if (password !== cpassword) {
    return res.status(400).json({
      status: false,
      message: 'Password does not match',
    });
  }
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (findUser) {
    return res.status(400).json({
      status: false,
      message: 'User alredy exist',
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  var activationLink = `${process.env.URL}/account-verification/${activationToken}`;
  // mail start
  try {
    // Read the EJS template
    const accountActivationTempEjs = await accountActivationTemp();
    if (!accountActivationTempEjs) {
      console.error('EJS template not found.');
      return res.status(400).json({
        status: false,
        message: 'Failed to send acctivation mail. Please try again.',
      });
    }
    // Render the EJS template with data
    var companylogo = `${process.env.URL}/assets/static/companylogo.png`;
    var companyname = process.env.COMPANY_NAME;
    const renderedHTML = ejs.render(accountActivationTempEjs, {
      activationLink: activationLink,
      name: req.body.name,
      email: req.body.email,
      companyname: companyname,
      companylogo: companylogo,
    });
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: `${process.env.COMPANY_NAME} : Account Activation`,
      html: renderedHTML,
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ' + error.message);
        return res.status(400).json({
          status: false,
          message: 'Failed to send acctivation mail. Please try again.',
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: 'Failed to send acctivation mail. Please try again.',
    });
  }
  // mail end
  //   create user
  const registerUser = await User.create({
    name: req.body.name,
    username: username,
    email: req.body.email,
    password: hashPassword,
    activationToken: activationToken,
    active: 0,
  });

  if (registerUser) {
    return res.status(200).json({
      message: 'Registration sucessfully completed',
      status: true,
      data: {
        id: registerUser.id,
        name: registerUser.name,
        email: registerUser.email,
        token: generateToken(registerUser.id),
      },
    });
  } else {
    return res.status(400).json({
      status: false,
      message: 'Invalid user data',
    });
  }
});

// @desc account activation link create
// @route POST /api/user/account-activation-link-create
// @access Private
// @Author Suvadip Maiti
const accountActivationLinkCreate = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var activationToken = crypto.randomBytes(20).toString('hex');
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      activationToken: activationToken,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
      activationToken: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }

  //   validation end

  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (findUser) {
    var activationLink = `${process.env.URL}/account-verification/${activationToken}`;
    // mail start
    try {
      // Read the EJS template
      const accountActivationTempEjs = await accountActivationTemp();
      if (!accountActivationTempEjs) {
        console.error('EJS template not found.');
        return res.status(400).json({
          status: false,
          message: 'Failed to send acctivation mail. Please try again.',
        });
      }
      // Render the EJS template with data
      var companylogo = `${process.env.URL}/assets/static/companylogo.png`;
      var companyname = process.env.COMPANY_NAME;
      const renderedHTML = ejs.render(accountActivationTempEjs, {
        activationLink: activationLink,
        name: findUser.name,
        email: findUser.email,
        companyname: companyname,
        companylogo: companylogo,
      });
      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: `${process.env.COMPANY_NAME} : Account Activation`,
        html: renderedHTML,
      };
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred: ' + error.message);
          return res.status(400).json({
            status: false,
            message: 'Failed to send acctivation mail. Please try again.',
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: false,
        message: 'Failed to send acctivation mail. Please try again.',
      });
    }
    // mail end
    //   update user activation token
    const updateUser = await User.update(
      {
        activationToken: activationToken,
        active: 0,
      },
      {
        where: {
          id: findUser.id,
        },
      }
    );
    if (updateUser) {
      return res.status(200).json({
        message: 'Account activation link sucessfully sended to your mail id.',
        status: true,
        data: findUser,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'Failed to send account activation link, Try again.',
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'Please insert already registered mail id.',
    });
  }
});

// @desc account activation
// @route POST /api/user/account-activation
// @access Private
// @Author Suvadip Maiti
const accountActivation = asyncHandler(async (req, res) => {
  const activationToken = req.body.token;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      activationToken: activationToken,
    },
    {
      activationToken: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //   validation end
  const findUser = await User.findOne({
    where: {
      activationToken: activationToken,
    },
  });
  if (findUser) {
    //   update user activation status
    const updateUser = await User.update(
      {
        activationToken: null,
        active: 1,
      },
      {
        where: {
          id: findUser.id,
        },
      }
    );
    if (updateUser) {
      return res.status(200).json({
        message: 'Your account sucessfully activated.',
        status: true,
        data: findUser,
      });
    } else {
      return res.status(400).json({
        status: false,
        message:
          'Your account not activated. Please click Resend activation link.',
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'Acctivation link invalid.',
    });
  }
});

// @desc forgot password email
// @route POST /api/user/forgot-password-email
// @access Private
// @Author Suvadip Maiti
const forgotPasswordEmail = asyncHandler(async (req, res) => {
  var email = req.body.email;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //   validation end
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  if (findUser) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    // mail start
    try {
      // Read the EJS template
      const forgotPasswordOtpTempEjs = await forgotPasswordOtpTemp();
      if (!forgotPasswordOtpTempEjs) {
        console.error('EJS template not found.');
        return res.status(400).json({
          status: false,
          message: 'Otp not send to your mail id. Please try again.',
        });
      }
      // Render the EJS template with data
      var companylogo = `${process.env.URL}/assets/static/companylogo.png`;
      var companyname = process.env.COMPANY_NAME;
      const renderedHTML = ejs.render(forgotPasswordOtpTempEjs, {
        otp: otp,
        name: findUser.name,
        email: findUser.email,
        companyname: companyname,
        companylogo: companylogo,
      });
      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: `${process.env.COMPANY_NAME} : Forgot Password`,
        html: renderedHTML,
      };
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred: ' + error.message);
          return res.status(400).json({
            status: false,
            message: 'Otp not send to your mail id. Please try again.',
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: false,
        message: 'Otp not send to your mail id. Please try again.',
      });
    }
    // mail end
    //   update user otp
    const updateUser = await User.update(
      {
        otp: otp,
      },
      {
        where: {
          id: findUser.id,
        },
      }
    );
    if (updateUser) {
      return res.status(200).json({
        message: 'Otp send to your mail id sucessfully.',
        status: true,
        data: {
          email: findUser.email,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'Otp not send to your mail id. Please try again.',
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'Please insert already registered mail id.',
    });
  }
});

// @desc forgot password otp
// @route POST /api/user/forgot-password-otp
// @access Private
// @Author Suvadip Maiti
const forgotPasswordOtp = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var otp = req.body.otp;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      otp: otp,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
      otp: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  // validator end

  const findUser = await User.findOne({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (findUser) {
    return res.status(200).json({
      message: 'Please create new password.',
      status: true,
      data: {
        email: findUser.email,
        otp: findUser.otp,
      },
    });
  } else {
    return res.status(400).json({
      status: false,
      message: 'Please insert correct otp sended to your registered mail id.',
    });
  }
});

// @desc forgot password insert new password
// @route POST /api/user/forgot-password-new-password
// @access Private
// @Author Suvadip Maiti
const forgotPasswordNewPassword = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var otp = req.body.otp;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      otp: otp,
      password: password,
      cpassword: cpassword,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
      otp: { type: 'string', empty: false, max: '100' },
      password: { type: 'string', empty: false, min: '8', max: '100' },
      cpassword: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  const passwordSchema = new passwordValidator();
  // Add password validation rules
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols(); // Must have symbols
  // Middleware function to check if a password is strong
  if (!passwordSchema.validate(password)) {
    return res.status(400).json({
      status: false,
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }
  //   validation end
  if (password !== cpassword) {
    return res.status(400).json({
      status: false,
      message: 'Password does not match',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const findUser = await User.findOne({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (findUser) {
    //   update user otp
    const updateUser = await User.update(
      {
        otp: null,
        password: hashPassword,
      },
      {
        where: {
          id: findUser.id,
        },
      }
    );
    if (updateUser) {
      return res.status(200).json({
        message: 'Password sucessfully changed.',
        status: true,
        data: {
          email: findUser.email,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'Failed to reset your password. Please try again.',
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'Failed to recognise your email and otp. Please try again.',
    });
  }
});

// @desc login
// @route POST /api/user/login
// @access Private
// @Author Suvadip Maiti
const login = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      password: password,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
      password: { type: 'string', empty: false, max: ' 100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  // validation end
  const loginUser = await User.findOne({
    where: { email: email },
  });
  if (loginUser) {
    if (loginUser.active) {
      if (await bcrypt.compare(req.body.password, loginUser.password)) {
        return res.status(200).json({
          message: 'login sucessfull',
          status: true,
          data: {
            id: loginUser.id,
            name: loginUser.name,
            username: loginUser.username,
            email: loginUser.email,
            avatar: loginUser.avatar,
            token: generateToken(loginUser.id),
            active: loginUser.active,
            admin: loginUser.admin,
          },
        });
      } else {
        return res.status(200).json({
          status: false,
          message: 'Invalid Credential',
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message:
          'Please activate your account through link send to your registered mail id.',
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'Email not exist',
    });
  }
});

// @desc login
// @route POST /api/user/logingoogle
// @access Private
// @Author Suvadip Maiti
const logingoogle = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var name = req.body.name;
  var token = req.body.token;
  var googleId = req.body.googleId;
  var googleAvatar = req.body.googleAvatar;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      email: email,
      name: name,
      token: token,
      googleId: googleId,
    },
    {
      email: { type: 'string', empty: false, max: '100' },
      name: { type: 'string', empty: false, max: '100' },
      token: { type: 'string', empty: false },
      googleId: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const loginUserFind = await User.findOne({
    where: { email: email, googleId: googleId,active: 1 },
  });
  if (loginUserFind) {
    const loginUser = await User.findOne({
      where: { email: email },
    });
    return res.status(200).json({
      message: 'login sucessfull',
      status: true,
      data: {
        id: loginUser.id,
        name: loginUser.name,
        username: loginUser.username,
        email: loginUser.email,
        avatar: loginUser.avatar,
        avatarFullUrl: loginUser.avatarFullUrl,
        token: generateToken(loginUser.id),
        googleId: loginUser.googleId,
        active: loginUser.active,
        admin: loginUser.admin,
      },
    });
  } else {
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(200).json({
        status: false,
        message: 'User alredy exist',
      });
    }
    var username = 'SmartCalcTools' + Date.now();
    const registerUser = await User.create({
      name: req.body.name,
      username: username,
      email: req.body.email,
      password: token,
      token: token,
      avatarFullUrl: googleAvatar,
      googleId: googleId,
      active: 1,
    });
    return res.status(200).json({
      status: true,
      message: 'Registration through google complete.',
      data: {
        googleId: googleId,
      },
    });
  }
});

// @desc update user
// @route POST /api/user/:id
// @access Private
// @Author Suvadip Maiti
const updateUser = asyncHandler(async (req, res) => {
  const findUser = await User.findOne({
    where: { id: req.params.id },
  });
  if (!findUser) {
    return res.status(400).json({
      status: false,
      message: 'User not found',
    });
  }
  var name = req.body.name;
  var avatarName = null;
  if (req.files && req.files.avatar) {
    var avatarFile = req.files.avatar;
    avatarName = avatarFile.name;
    avatarFile.mv(
      'src/public/uploads/avatar/' + avatarFile.name,
      function (err) {
        if (err) {
          res.status(400).json({
            status: false,
            message: 'File not uploaded',
          });
        } else {
          avatarName = avatarFile.name;
        }
      }
    );
  }

  // unlink image
  if (avatarName && findUser && findUser.avatar) {
    const avatarImage = findUser.avatar;
    const directoryPath = 'src/public/uploads/avatar/';
    fs.unlink(directoryPath + avatarImage, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //   validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      name: name,
    },
    {
      name: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      satus: false,
      message: validationResponse[0].message,
    });
  }
  // validation end
  const updateUserData = {
    name: name,
    avatar: avatarName ? avatarName : findUser.avatar,
  };
  let updateUser = await User.update(updateUserData, {
    where: { id: req.params.id },
  });
  const updatedUser = await User.findOne({
    where: { id: req.params.id },
  });
  return res.status(200).json({
    message: `Profile sucessfully updated`,
    status: true,
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      token: req.token,
      active: updatedUser.active,
      admin: updatedUser.admin,
    },
  });
});



// @desc update user
// @route POST /api/user/password/:id
// @access Private
// @Author Suvadip Maiti
const updateUserPassword = asyncHandler(async (req, res) => {
  const findUser = await User.findOne({
    where: { id: req.params.id },
  });
  if (!findUser) {
    return res.status(400).json({
      status: false,
      message: 'User not found',
    });
  }
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  //   validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      password: password,
      cpassword: cpassword,
    },
    {
      password: { type: 'string', empty: false, max: '100' },
      cpassword: { type: 'string', empty: false, max: '100' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      satus: false,
      message: validationResponse[0].message,
    });
  }
  const passwordSchema = new passwordValidator();
  // Add password validation rules
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols(); // Must have symbols
  // Middleware function to check if a password is strong
  if (!passwordSchema.validate(password)) {
    return res.status(400).json({
      status: false,
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }
  //   validation end
  if (password !== cpassword) {
    return res.status(400).json({
      status: false,
      message: 'Password does not match',
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const updateUserData = {
    password: hashPassword,
  };
  let updateUserPassword = await User.update(updateUserData, {
    where: { id: req.params.id },
  });
  const updatedUser = await User.findOne({
    where: { id: req.params.id },
  });
  return res.status(200).json({
    message: `Profile sucessfully updated`,
    status: true,
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      token: req.token,
      active: updatedUser.active,
      admin: updatedUser.admin,
    },
  });
});

// @desc all users
// @route GET /api/users
// @access Private
// @Author Suvadip Maiti
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({
    message: 'all users',
    status: true,
    data: users,
  });
});

// @desc User Find By email
// @route GET /api/users/find/email/:email
// @access Private
// @Author Suvadip Maiti
const findUserByEmail = asyncHandler(async (req, res) => {
  var email = req.params.email;
  const user = await User.findOne({
    email: email,
  });
  return res.status(200).json({
    message: 'User Show sucessfull.',
    status: true,
    data: user,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = {
  register: register,
  login: login,
  logingoogle: logingoogle,
  updateUser: updateUser,
  updateUserPassword: updateUserPassword,
  allUsers: allUsers,
  findUserByEmail: findUserByEmail,
  forgotPasswordEmail: forgotPasswordEmail,
  forgotPasswordOtp: forgotPasswordOtp,
  forgotPasswordNewPassword: forgotPasswordNewPassword,
  accountActivation: accountActivation,
  accountActivationLinkCreate: accountActivationLinkCreate,
};
