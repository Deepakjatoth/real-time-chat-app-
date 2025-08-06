# 💬 Real-Time Chat Application (AWS Serverless)

This is a real-time chat application built using a **serverless architecture on AWS**. It allows users to exchange messages instantly via WebSockets.

---

## 📌 Project Overview

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: AWS Lambda (Node.js)
- **Real-time communication**: API Gateway WebSocket
- **Database**: DynamoDB
- **Infrastructure**: Serverless (No EC2 involved)

---

## ✅ Features

- Real-time message delivery
- Serverless backend using AWS Lambda & API Gateway WebSockets
- Message persistence using DynamoDB
- Simple and clean frontend

---

## 🔧 Architecture

```txt
Browser (Frontend)
      ⬇ WebSocket
API Gateway (WebSocket API)
      ⬇ Trigger
AWS Lambda Functions
      ⬇
Amazon DynamoDB (message storage)
