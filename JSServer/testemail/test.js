import nodemailer from 'nodemailer';

// Directly set the email user and password
const EMAIL_USER = 'arjunyadavar2002@gmail.com';
const EMAIL_PASS = 'ntnq jdal pltu byei';  // Make sure to update with your actual password

// Create Nodemailer transporter using the provided credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Function to send a test email
const sendTestEmail = async () => {
  try {
    const mailOptions = {
      from: EMAIL_USER,  // Sender email
      to: 'shankaryadavar2004@gmail.com',  // Replace with the recipient's email
      subject: 'Test Email',
      text: 'Hello, this is a test email from NodeMailer!',
      html: '<h1>Hello</h1><p>This is a test email from NodeMailer!</p>',
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
};

// Call the function to send the email
sendTestEmail();
