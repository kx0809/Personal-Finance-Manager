# Personal Finance Manager Mobile Application

A mobile expense tracking application developed using React Native to help users monitor, manage, and analyze their personal income and expenses.  
This project demonstrates mobile application development, local data persistence, real-time communication, and integration with external services.

---

## 📌 Project Overview

**Personal Finance Manager** is a mobile application designed to assist users in tracking their daily income and expenses in an organized and intuitive manner.

The application allows users to record financial transactions, view categorized summaries, analyze monthly income and expenses through visual **pie chart reports**, and secure their financial data using a passcode lock.

This project was developed as a **team-based academic project (4 members)** and is included in my portfolio to showcase my mobile application development skills using **React Native**.

---

## ✨ Key Features

### 👤 Users
- Add, edit, and delete income and expense records
- Categorize transactions (e.g., Food, Transport, Rent, Bills, Salary)
- Monthly income and expense reports with **pie chart** visualization
- Drawer-based navigation for smooth user experience
- User profile customization (avatar and display name)

### 🔢 Calculator & Currency Tools
- Built-in calculator implemented using a **custom Python server**
- Real-time calculator communication via **WebSocket**
- Currency conversion using live exchange rates from an external web service

### 📝 Feedback
- In-app feedback form allowing users to submit suggestions and comments
- Submitted feedback is sent to the backend server and **logged in the server terminal**
- No dedicated admin UI for feedback management in this version

### 🔐 Security
- Optional **passcode lock** to prevent unauthorized access
- Passcode validation and secure local storage

---

## 🧰 Tech Stack

| Layer | Technologies |
|------|-------------|
| Mobile Framework | React Native |
| Language | TypeScript, JavaScript |
| Navigation | React Navigation (Drawer & Stack) |
| Local Storage | SQLite, AsyncStorage |
| Charts | react-native-chart-kit |
| Real-time Communication | WebSocket |
| Backend Service | Python |
| External Services | Exchange Rates API |
| Version Control | Git, GitHub |

---

## 🏗️ Application Architecture

- Component-based architecture using React Native
- Drawer and stack navigation for screen management
- Local data persistence using SQLite
- User preferences and security data stored via AsyncStorage
- Custom Python server for calculator logic
- WebSocket-based real-time communication between mobile app and server
- Feedback form submissions handled by backend server with terminal-based logging
- Modular and reusable UI components

---

## 🔐 Security Measures

- Passcode-based application lock
- Passcode validation logic
- Secure local storage of passcode using AsyncStorage
- Restricted access to application content when passcode lock is enabled

---

## 👤 My Contributions

This was a **team-based project (4 members)**.  
My individual contributions focused on **application security, navigation, data visualization, and real-time communication**, including:

- Implementation of **passcode lock** and validation logic
- Drawer navigation and overall navigation structure
- User profile management:
  - Avatar selection
  - Display name customization
- Monthly income and expense report:
  - Data aggregation logic
  - **Pie chart** visualization
- Calculator feature:
  - WebSocket-based communication
  - Integration with a custom Python server
- Currency conversion feature using **Exchange Rates API**
- Integration of AsyncStorage for secure and persistent user settings

---

## 📦 Project Status

- Fully functional mobile application
- Tested locally using emulator and physical device
- Not deployed to app stores
- No cloud backend deployment

---

## 🚀 Future Improvements

- Enhanced UI/UX design
- Deployment to Google Play Store and Apple App Store

---

## 📝 Notes

This project is part of my personal portfolio to demonstrate mobile application development using React Native, secure local data handling, real-time client–server communication, and team-based software development experience.
