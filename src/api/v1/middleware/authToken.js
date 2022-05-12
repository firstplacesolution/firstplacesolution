const jwt = require('jsonwebtoken');
require('dotenv').config()
const accessTokenSecret = 'youraccesstokensecret';
const generateToken = (user) => {
    console.log(user)
    return jwt.sign(
        {
            user_email: user.user_email,
            user_password: user.user_password,
        },
        process.env.JWT_SECRET || 'youraccesstokensecret',
        {
            expiresIn: '30d',
        }
    );
};

const generatePhoneToken = (user) => {
    console.log(user)
    return jwt.sign(
        {
            user_phone: user.phone,
            user_reqId: user.reqId
            // user_password: user.user_password,
        },
        process.env.JWT_SECRET || 'youraccesstokensecret',
        {
            expiresIn: '30d',
        }
    );
};



const generateMerchantToken = (user) => {
    console.log(user)
    return jwt.sign(
        {
            user_kyc_type: user.kyc_type,
            user_licence_no: user.licence_no
            // user_password: user.user_password,
        },
        process.env.JWT_SECRET || 'merchantaccesstokensecret',
        {
            expiresIn: '365d',
        }
    );
};

const generateBackOfficeToken = (user) => {
    if (user.email === undefined) {
      return jwt.sign(
        {
          user_email: user.username,
          user_password: user.password,
        },
        process.env.JWT_SECRET_BACKOFFICE || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    } else {
      return jwt.sign(
        {
          user_email: user.email,
          user_password: user.password,
        },
        process.env.JWT_SECRET_BACKOFFICE || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    }
  };
  
  const generateHrToken = (user) => {
    if (user.email === undefined) {
      console.log("hello");
      return jwt.sign(
        {
          user_email: user.username,
          user_password: user.password,
        },
        process.env.JWT_SECRET_HR || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    } else {
      console.log("hi");
      return jwt.sign(
        {
          user_email: user.email,
          user_password: user.password,
        },
        process.env.JWT_SECRET_HR || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    }
  };
  
  const generateAdminToken = (user) => {
    if (user.email === undefined) {
      return jwt.sign(
        {
          user_email: user.username,
          user_password: user.password,
        },
        process.env.JWT_SECRET_ADMIN || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    } else {
      return jwt.sign(
        {
          user_email: user.email,
          user_password: user.password,
        },
        process.env.JWT_SECRET_ADMIN || "youraccesstokensecret",
        {
          expiresIn: "30d",
        }
      );
    }
  };
  
  // ----------------------------------authenticate------------------------//
  
  function authenticateAdmin(req, res, next) {
    //const authHeader = req.headers['authorization']
    let authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
  
  function authenticateBackOffice(req, res, next) {
    //const authHeader = req.headers['authorization']
    let authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_BACKOFFICE, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
  function authenticateHr(req, res, next) {
    //const authHeader = req.headers['authorization']
    let authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_HR, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }





function authenticateMERCHANT(req, res, next) {
    //const authHeader = req.headers['authorization']
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'merchantaccesstokensecret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                console.log('User Verified');
            }
            // userId = "1";
            // if (userId === req.body.userId) {
            //     console.log('User Verified');
            // }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


function authenticateJWT(req, res, next) {
    //const authHeader = req.headers['authorization']
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,  process.env.JWT_SECRET || 'youraccesstokensecret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            userId = "1";
            if (userId === req.body.userId) {
                console.log('User Verified');
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = {
    generateMerchantToken,
    authenticateMERCHANT,
    generateToken,
    authenticateJWT,
    generatePhoneToken,
    generateAdminToken,
    authenticateAdmin,
    generateBackOfficeToken,
    authenticateBackOffice,
    generateHrToken,
    authenticateHr,
}