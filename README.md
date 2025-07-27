# Doctor-Patient Booking API - Rx.Now Backend Developer Task

This is a backend REST API service built with **Node.js**, **Express**, and **MongoDB** that allows patients to view doctors and book appointments, and doctors to view their appointments. The service simulates user roles without authentication, using headers to distinguish between patients and doctors.

---

## Features

- List all doctors
- View doctor details
- Book appointments (patients only)
- View appointments (doctors see their appointments; patients see theirs)
- Simple role simulation (no authentication)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables

---

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) connection URI (Atlas or local)
- [Postman](https://www.postman.com/) or curl for testing APIs
