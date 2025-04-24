import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Rule from '../models/rules.js';
import SensorData from '../models/SensorData.js';

// Load environment variables from .env file
dotenv.config();
console.log("EMAIL_USER: ", process.env.EMAIL_USER);
console.log("EMAIL_PASS: ", process.env.EMAIL_PASS ? '********' : 'Not set');

// Create Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can change the service (e.g., 'hotmail', 'yahoo', etc.)
  auth: {
    user: process.env.EMAIL_USER,  // From your .env file
    pass: process.env.EMAIL_PASS   // From your .env file
  }
});

// Add a rule to the DB
export const addRule = async (req, res) => {
  try {
    const { appliance, temperatureThreshold, humidityThreshold, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const rule = new Rule({
      appliance,
      temperatureThreshold,
      humidityThreshold,
      email
    });

    console.log('Adding Rule:', { appliance, temperatureThreshold, humidityThreshold, email });


    // Save the rule to the DB
    await rule.save();

    res.status(201).json({ message: 'Rule added successfully', rule });
  } catch (error) {
    console.error('Error adding rule:', error.message);
    res.status(500).json({ error: 'Failed to add rule' });
  }
};

// Check latest sensor data and trigger email if rule breached
export const checkSensorAndNotify = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 }).exec();
    if (!latestData) {
      return res.status(404).json({ message: 'No sensor data found' });
    }

    const { temperature, humidity } = latestData;
    console.log(`Latest Sensor Data - Temp: ${temperature}°C, Humidity: ${humidity}%`);

    const latestRule = await Rule.findOne().sort({ createdAt: -1 }).exec();
    if (!latestRule) {
      return res.status(404).json({ message: 'No rules found' });
    }

    console.log('Latest Rule:', latestRule);

    const tempExceeded = temperature >= latestRule.temperatureThreshold;
    const humidExceeded = humidity >= latestRule.humidityThreshold;

    const thresholdBreached = tempExceeded || humidExceeded;

    console.log(`Thresholds - Temp: ${latestRule.temperatureThreshold}°C, Humidity: ${latestRule.humidityThreshold}%`);
    console.log(`Thresholds Exceeded - Temp: ${tempExceeded}, Humidity: ${humidExceeded}`);
    console.log(`Already Notified?`, latestRule.notified);

    if (thresholdBreached && !latestRule.notified) {
      await sendEmailNotification(
        latestRule.email,
        latestRule.appliance,
        temperature,
        humidity
      );

      // Mark as notified
      latestRule.notified = true;
      await latestRule.save();

      return res.status(200).json({
        message: 'Threshold breached. Email sent.',
        appliance: latestRule.appliance,
        temperature,
        humidity
      });

    } else if (!thresholdBreached && latestRule.notified) {
      // Reset notification if values are back to normal
      latestRule.notified = false;
      await latestRule.save();
      console.log('Thresholds normal. Notified status reset.');
    }

    res.status(200).json({ message: 'Check complete. No new alerts.' });

  } catch (err) {
    console.error('Error during sensor check:', err.message);
    res.status(500).json({ error: 'Server error during threshold check' });
  }
};



// Nodemailer function to send email notifications
async function sendEmailNotification(email, appliance, temperature, humidity) {
  try {
    const mailOptions = {
      from: `"Smart Automation" <${process.env.EMAIL_USER}>`,  // Sender's email
      to: email,  // Recipient's email from the rule
      subject: `⚠️ Alert: ${appliance} Threshold Breached`,  // Email subject
      text: `Hi there,\n\nYour appliance "${appliance}" has exceeded the defined thresholds.\n\n📈 Temperature: ${temperature}°C\n💧 Humidity: ${humidity}%\n\nPlease take necessary action.\n\n- Smart Automation System`  // Email body (text format)
    };

    // Send the email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}. Message ID:`, info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
}
