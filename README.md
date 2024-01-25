# [AHE] Data protection and data security - Semester Project

## Overview
This repository contains the source code of an application created to conduct data protection and security classes at the Academy of Humanistic-Economic in Łódź. The application is a classical REST API coded in the Nest.JS framework, utilizing the full capabilities of TypeScript and the express.js library for creating advanced web applications. The program implements the AAA model (Authentication, Authorization, Accounting). The main objective is to guarantee data protection by ensuring consistent user authentication, authorization, and efficient access control.

## Features
- **Authentication**: Secure user authentication mechanisms.
- **Authorization**: Role-based access control for resources within the application.
- **Ticket Management**: Creation and handling of user tickets with varying statuses and roles.
- **User Management**: Admin functionalities for user account management.

## Technology Stack
- **Backend**: NestJS, TypeORM
- **Database**: PostgreSQL
- **Authentication**: Passport, JWT
- **Testing**: Jest
- **Logging**: Pino
- **Other Dependencies**: See `package.json` for detailed dependencies.

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/JakubMaslanka/rest-api-od-bd-project
cd rest-api-od-bd-project
npm run docker:start
```

## Deployment
The application is hosted on AWS and is accessible at [http://ahe.odbd.project.jakubmaslanka.site](http://ahe.odbd.project.jakubmaslanka.site).

## API Documentation
Swagger is used for API documentation. Access the API docs at `/docs` on the running application instance.