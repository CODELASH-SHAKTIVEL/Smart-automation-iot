# 🌡️ SensorTrack – Smart Environment Dashboard with Expense Insights

**SensorTrack** is a powerful, customizable frontend dashboard built with modern web technologies to help users **visualize real-time environmental data** (temperature and humidity) and **track electricity-related expenses**. It empowers users to make **data-driven decisions** to reduce energy consumption and costs.

---

## 🚀 Features

- 📊 Real-time Temperature & Humidity Monitoring
- 💸 Electricity Expense Tracker
- 🔧 Customizable Expense Limit & Savings Estimation
- 🌈 TailwindCSS-based Modern UI
- 📉 Beautiful Charts with Recharts
- 🔥 Next.js App Directory + Client Components
- ⚡ Built for Performance and Responsiveness

---

## 📸 Preview

![Sensor Dashboard Preview](./public/assets/sensortrack-preview.png) <!-- Replace with your screenshot path -->

---

## 🧑‍💻 Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| **Next.js**    | Framework for React & routing    |
| **React**      | UI library                       |
| **TailwindCSS**| Utility-first CSS styling        |
| **Recharts**   | Graphs & data visualization      |
| **TypeScript** | Type safety                      |

---

## 📂 Folder Structure

```
smart-home-dashboard/
├── client/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/       # API calls
│       ├── App.tsx
│       └── main.tsx
├── server/                 # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── index.ts
├── pi-scripts/             # Raspberry Pi Scripts
│   ├── sensor_reader.py    # Reads sensor and sends data
│   ├── controller.py       # Listens to control commands
│   └── config.json
├── .env
├── README.md
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sensortrack.git
cd sensortrack
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Routes Overview

| Path                        | Description                           |
|-----------------------------|---------------------------------------|
| `/`                         | Landing / home page                   |
| `/dashboard/sensor-stats`  | Main sensor dashboard with graphs     |

---

## 📈 Functionality Overview

- `Temperature` and `Humidity` values are simulated with mock data.
- The graph updates dynamically based on the selected metric.
- Users can **set an expense threshold**.
- Estimated **electricity savings** shown based on climate control.

---

## 🔮 Future Enhancements

- ✅ Real-time API data from sensors
- ⚙️ User settings & notification alerts
- 🗓️ Historical data visualization
- 📲 Responsive PWA support

---

## 📜 License

MIT License.  
Feel free to use, fork, and contribute!

---

## ✨ Credits

Crafted with ❤️ by Codelash-Shaktivel
Inspired by modern smart home dashboards and sustainability tools.

---

## 💬 Feedback or Contributions

- Found a bug? Open an issue.
- Want to contribute? Fork the repo and submit a PR.
- Connect with me on [GitHub](https://github.com/your-username)


