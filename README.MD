# Simple Library REST API

This is a simple library management REST API designed for managing book loans and member records. The application allows you to track which members have borrowed which books, providing an easy way to manage and oversee library transactions.

## Prerequisite

To run this application, you need to have the following installed on your local machine:

- NodeJs v18.19.0
- MySQL latest

## Installation

### 1. Copy Environment Variables

Create a .env file from the example configuration:

```bash
cp .env.example .env
```

### 2. Install Package

Install the necessary packages:

```bash
yarn
```

or

```bash
npm install
```

### 3. Run Migration & Seeder

```bash
npx prisma migrate dev
```

then run seeder using:

```bash
yarn seed
```

Or

```bash
npm run seed
```

## 4. Running Application

Start the application in development mode:

```bash
yarn dev
```

or

```bash
npm run dev
```

## 5. Access Documentation

API Documentation can be accessed at [http://localhost:4000/docs]

## Test

### Running Test

Execute the test suite to ensure everything is working correctly:

```bash
yarn test
```

or

```bash
npm run test
```
