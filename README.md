# Home BACKEND TASK


## Data Models

> **All models are defined in src/model.js**

### Profile

The user collection

### ProfileAggregatedHealthData

Stores aggregated health data


## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.





# Project Title

## Overview

This project has undergone significant structural changes to improve its functionality and maintainability. Below are the key updates and features:

### Core Structural Changes

- **Modular Code Structure**: The codebase is now organized in a modular way, which enhances readability and maintainability. The main components include:
  - **Controllers**: Manage the flow of data between the model and view.
  - **Services**: Contain business logic and handle the operations required by the controllers.
  - **Routes**: Define the endpoints and link them to the appropriate controllers.
    --**TYPES** to add the types for core entity status
    --**UTILS** to have scope and support for core utils

### Technology Stack

- **Node.js**: The application is built using Node.js, adhering to the original requirements.
- **TypeScript Typing**: Efforts have been made to add typings, particularly for core status, to enhance code reliability.

### Database

- **ORM with Sequelize**: The database layer is managed using Sequelize ORM. This provides:
  - **Proper Error Handling**: Ensures that any database-related errors are caught and managed appropriately.
  - **Strong ACID Compliance**: Particularly for payment-related data, ensuring data integrity and consistency.

### Authentication

- **Authentication Checks**:
  - `checkForAuth`: A middleware to verify user authentication.
  - `isAdmin`: Ensures that only users with admin privileges can access certain routes.

### Testing

- **Unit Test Coverage**: Comprehensive unit tests are in place for all major services, ensuring robust functionality.
- **Improved Test Coverage**: An extra hour was invested to achieve better test coverage than initially anticipated.

### Environment Configuration

- **Environment Variables**: An `.env` file has been added to manage authentication-related tokens securely for admin app.

### Documentation

- **Postman Documentation**: Detailed API documentation is available via Postman, facilitating easy testing and integration.


## Next Steps

- **Stronger Typing**: Further improvements are planned to make the code more strongly typed.
- **Validation**: Implement validation using Joi custom classes for errors and responses to ensure data integrity and user input validation.

These updates collectively enhance the performance, security, and usability of the application, setting a solid foundation for future development and scaling.
