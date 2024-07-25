const nodemailer = require("nodemailer");
const { http } = require("./const");
const { emailPassword, emailNode } = require("../config");

exports.sendEmail = async (email, story) => {
  try {
    // Configure the nodemailer transporter using Gmail's SMTP server
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${emailNode}`, // Gmail email address
        pass: `${emailPassword}`, // Gmail email password
      },
    });

    // Create the HTML content for the email
    const storyHtml = `
      <h1>${story.title}</h1>
      <h3>Created by: ${story.createdBy.username}</h3>
      <br>
       <h2>Contributions:</h2>
      <ul>
        ${story.contributions
          .map(
            (contrib) =>
              `<li><b>${contrib.user.username} : </b> ${contrib.content}</li>`
          )
          .join("")}
      </ul>
    `;

    // Define the email options
    var mailOptions = {
      from: `${emailNode}`, // Sender email address
      to: `${email}`, // Recipient email address
      subject: `${story.title}`, // Subject of the email
      html: storyHtml, // HTML body of the email
    };

    // Send the email using the transporter
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // Log the error if sending fails
        console.log("nodemailer error", error);
      } else {
        // Log the success message if sending succeeds
        console.log("Email sent: " + info.response);
      }
    });

    // Return success message
    return `story has sent to email ${email} `;
  } catch (error) {
    // Log and send error response if an exception occurs
    console.log(error, "nodemailer Error");
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "error", error });
  }
};
