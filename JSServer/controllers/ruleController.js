import Rule from '../models/rules.js';
import SensorData from '../models/sensorData.js';
import emailjs from '@emailjs/browser';



// Add a rule to the DB
export const addRule = async (req, res) => {
  try {
    const { appliance, temperatureThreshold, humidityThreshold,email} = req.body;
   

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const user_email = email;

    const rule = new Rule({
      appliance,
      temperatureThreshold,
      humidityThreshold
    });

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
    // Step 1: Get the latest sensor data
    const latestData = await SensorData.findOne().sort({ createdAt: -1 }).exec();
    if (!latestData) {
      return res.status(404).json({ message: 'No sensor data found' });
    }

    const { temperature, humidity } = latestData;

    // Step 2: Get the most recent rule
    const latestRule = await Rule.findOne().sort({ createdAt: -1 }).exec();
    if (!latestRule) {
      return res.status(404).json({ message: 'No rules found' });
    }

    // Step 3: Check threshold breaches
    const tempExceeded = temperature >= latestRule.temperatureThreshold;
    const humidExceeded = humidity >= latestRule.humidityThreshold;

    if (tempExceeded || humidExceeded) {
      // 🚀 Trigger Email Notification
      await sendEmailNotification(latestRule.appliance, temperature, humidity,user_email);

      return res.status(200).json({
        message: 'Threshold breached. Email sent.',
        appliance: latestRule.appliance,
        temperature,
        humidity
      });
    }

    res.status(200).json({ message: 'No thresholds breached' });

  } catch (err) {
    console.error('Error during sensor check:', err.message);
    res.status(500).json({ error: 'Server error during threshold check' });
  }
};

// EmailJS trigger function
async function sendEmailNotification(email, appliance, temperature, humidity) {
    try {
      const response = await emailjs.send(
        'service_1gonlwt',        // Your Service ID
        'template_5or46un',       // Your Template ID
        {
          to_email: email,
          appliance_name: appliance,
          temperature: temperature,
          humidity: humidity
        },
        'bNHV7M2UXVt_Z9kUK'       // Your Public Key (User ID)
      );
  
      console.log(`✅ Email sent successfully to ${email} with status:`, response.status);
    } catch (error) {
      console.error('❌ Failed to send email:', error.message);
    }
  }
