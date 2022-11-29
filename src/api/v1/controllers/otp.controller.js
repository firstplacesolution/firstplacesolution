const Model = require('../models/otp.models.js')
// const businessModel = require('../models/business.model')
const kycModel = require('../models/kyc.model')
const { validationResult } = require('express-validator');
const axios = require('axios').default;
const { randomBytes } = require('crypto')
const { generatePhoneToken } = require('../middleware/authToken')
// var parser = require('ua-parser-js');
const { badRequest,success, unknownError } = require('../helpers/response_helper');

require('dotenv').config()
const textlocalapi = process.env.TEXTLOCALAPI

function generateOtp2() {
    var digits = "123456789"
    var otp = ""
    for (let i = 1; i <= 6; i++) {
        const num = digits[Math.floor((Math.random() * 9))]
        otp += num
    }

    return otp
}

async function sendOtpAndSave(req, res) {
    const otp = generateOtp2()

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors)
        } else {

            const body = { "number": req.body.number };
            var url = `https://api.textlocal.in/send/?apikey=${textlocalapi}=&numbers=${body.number}&sender=FABLOP&message=` + encodeURIComponent(`Greetings from Fablo, ${otp} is your verification code to login into Fablo Platforms.`);
            axios.get(url).then(async function (response) {
                if (response.data.status === "failure") {
                    badRequest(res, "Something Went Wrongs", {
                        "status": response.data.status,
                    });
                } else {
                    try {
                        Model.find({ phone: req.body.number }).then(async (result) => {

                            let user_id = "";

                            if (result[0] != undefined) {
                                result.forEach((data) => {
                                    user_id = data.userId
                                })
                            } else {
                                user_id = randomBytes(4).toString('hex')
                            }

                            let reqId = randomBytes(4).toString('hex');
                            let userData = {

                                userId: user_id,
                                reqId: reqId,
                                otp: otp.toString(),
                                phone: req.body.number,
                                sendTime: Date.now(),
                                ipAddress: req.body.ipAddress,

                            }
                            let body = Object.assign(userData, {
                                "token": generatePhoneToken(userData)
                            })
                            console.log(userData)
                            console.log(body)

                            let model = new Model(body)

                            await model.save((err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(result)
                                    console.log("Data added successfully");
                                }
                            })

                            return success(res, "Otp sent successfully", {
                                "status": response.data.status,
                                "reqId": reqId
                            });

                        }).catch((err) => {
                            console.log(err)
                        })


                        // console.log(`req id is ${reqId}`);

                    } catch (err) {
                        onError(res, "bad request", err)
                    }
                }
            })
                .catch(function (error) {
                    onError(res, "bad request", error)
                });

        }
    } catch (error) {
        onError(res, "bad request", error)
    }
}

async function validateOtp(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            res.send(errors)
        } else {
            try {
                let data = await Model.findOne({ reqId: req.body.reqId })
                console.log(data)
                if (data.otp == req.body.otp) {

                        let businessUser = await businessModel.findOne({ userId: data.userId })
                        if (businessUser) {
                            if (businessUser.kycStatus) {
                                let kycData = await kycModel.findOne({ businessId: businessUser.businessId })
                                success(res, "User verified", {
                                    "userId": data.userId,
                                    "businessId": businessUser.businessId,
                                    "kycStatus": businessUser.kycStatus,
                                    "status": "success",
                                    "token": kycData.token
                                });

                            } else {
                                success(res, "User verified", {
                                    "userId": data.userId,
                                    "businessId": businessUser.businessId,
                                    "kycStatus": businessUser.kycStatus,
                                    "status": "success",
                                    "token": data.token
                                });
                            }

                        }

                        else {
                            success(res, "User verified", {
                                "userId": data.userId,
                                "message": "You are not the merchant",
                                "status": "success",
                                "token": data.token
                            });
                        }

                } else {
                    unknownError(res, 'otp cannot be verified')
                }

                // .then((result) => {
                //     result.forEach((data) => {
                //         if (data.otp === req.body.otp) {
                //             success(res, "User verified", {
                //                 "userId":data,
                //                 "status": "success",
                //                 "token":generatePhoneToken(data)
                //             });
                //         }
                //     })
                // })
                // // console.log(data)
            } catch (err) {
                unknownError(res, err)
            }
        }
    } catch (err) {
        onError(res, "bad request", error)
    }
}

module.exports = {
    sendOtpAndSave,
    validateOtp
}