{
  /* 
// @ts-ignore */
}
import { VercelRequest, VercelResponse } from "@vercel/node";

import * as dotenv from "dotenv";
import * as express from "express";

dotenv.config({ path: `${__dirname}/../.env` });

const router = express.Router();

router.get("/api/hello", (req: VercelRequest, res: VercelResponse, next) => {
  res.json("World");
});

// router.post("/api/join-waitlist", async (req: VercelRequest, res: VercelResponse, next) => {
//   const sgMail = require("@sendgrid/mail");
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: req.body.email, // Change to your recipient
//     from: "eric.choi@coffeebeans.fyi", // Change to your verified sender
//     templateId: "d-c436dc40b7e84981bab4517e7f972476",
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });

router.post("/api/join-waitlist", async (req: VercelRequest, res: VercelResponse, next) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
  const msg = {
    // to: req.body.email, // Change to your recipient
    from: {
      email: "eric.choi@coffeebeans.fyi", // Change to your verified sender
      name: "Eric from coffeebeans.fyi",
    },
    templateId: "d-c436dc40b7e84981bab4517e7f972476",
    personalizations: [
      {
        to: "eric.choi@coffeebeans.fyi",
        dynamic_template_data: {
          subject: `${req.body.email} signed up! Fav bean is ${req.body.favoriteBean}`,
        },
      },
      {
        to: req.body.email,
        dynamic_template_data: {
          subject: `You're On The Waitlist For coffeebeans.fyi! Here's our plan`,
        },
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch(error => {
      console.error(error);
    });
});

export default router;
