import type { NextApiRequest, NextApiResponse } from "next";
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail", //name of email provider
  auth: {
    user: "paulambrose5002@gmail.com", // sender's gmail id
    pass: process.env.PASS, // sender password
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse, err: any) => {
  const { email } = req.body;
  console.log(email, req.body.email, "opps", process.env.PASS);

  try {
    if (req.method === "POST") {
      if (!email) {
        res.status(422).json({ message: "invalid mail" });
        return;
      }

      // if (!client.connected()) await client.connect();
      //if (err) throw err;

      var mailOptions = {
        from: "paulambrose5002@gmail.com", // sender's gmail
        to: email, // receiver's gmail
        subject: "thanks for commenting on my blog", //subject
        text: `thank you very much for commenting on my blog. please, feel free to learn from us when need be . `, //message Description
      };
      var mailOptions2 = {
        from: "paulambrose5002@gmail.com", // sender's gmail
        to: "paulambrose2005@gmail.com", // receiver's gmail
        subject: "Hey Bro", //subject
        text: `there's a new comment on your blog . `, //message Description
      };
      transporter.sendMail(
        mailOptions,

        function (error: any, info: { response: string }) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
      // transporter.sendMail(
      //   mailOptions2,

      //   function (error: any, info: { response: string }) {
      //     if (error) {
      //       console.log(error);
      //       res.status(200).json({
      //         message: "invalid mail",
      //       });
      //     } else {
      //       console.log("Email sent: " + info.response);
      //     }
      //   }
      // );
      res.status(200).json({
        message: "commented successfully",
      });
    } else {
      res.status(400).json({
        message: "bad request",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
export default handler;
