import nodemailer from "nodemailer"

const queryemail = async (req,res) => {
    const { userName, userEmail, userPhoneNumber, serviceProviderEmail,location,servicename,descriptionInput } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
       user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
        from: process.env.EMAIL_USER,
      to: serviceProviderEmail,
      subject: 'New Inquiry for Your Service',
      html: `
        <h3>New Inquiry Details</h3>
        <p><strong>Username:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Phone Number:</strong> ${userPhoneNumber}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Service Name:</strong> ${servicename}</p>
        <p><strong>Description:</strong> ${descriptionInput}</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  
};


const Contactemail = async (req, res) => {
  try {
   
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
   
      return res.status(400).json({ error: "All fields are required." });
    }

    

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mohityadav453036@gmail.com",
      subject: "New Inquiry for Your Service",
      html: `
        <h3>New Inquiry Details</h3>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Description:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

export {queryemail,Contactemail}