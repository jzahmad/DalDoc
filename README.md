## DalDoc: A Study Resource Platform for Dalhousie Students

DalDoc is a web application designed to help Dalhousie University students access study resources, including course
outlines, notes, assignments, and past exams. The platform features a user-friendly interface, comprehensive search
functionality, and robust document management capabilities.

### Summary

The project is comprised of two main parts:

* **Backend:** A Node.js application utilizing Express.js framework for routing and MySQL database for storing
department, course, and user information. The backend also utilizes AWS services like S3 for file storage and SNS for
sending email notifications.
* **Frontend:** A React.js application for user interaction, document display, search functionality, and a discussion
board.

### Features

**Backend:**

* User Authentication: Secure user login and registration system with password hashing.
* Department Management: Allows administrators to add new departments.
* Course Management: Facilitates the addition of new courses by administrators.
* Document Management: Enables users to upload and download PDF files for various courses and departments.
* Email Notifications: Sends email alerts to administrators when new departments or courses are requested.

**Frontend:**

* User-friendly interface: Simple and intuitive design for easy navigation.
* Search functionality: Allows users to search for specific courses or departments.
* Document viewer: Provides a built-in PDF viewer for seamless document access.
* Discussion board: Enables users to engage in discussions related to specific departments or courses.
* Upload feature: Allows users to upload their own study resources.
* Secure login: Protects user information with secure authentication.

### Tech Stack

* **Languages:**
* JavaScript
* SQL
* **Frameworks:**
* Express.js
* React.js
* **Technologies:**
* MySQL
* AWS (S3, SNS)
* JWT
* bcrypt
* Axios
* Material-UI
* flowbite-react
* react-router-dom
* @react-pdf-viewer/core
* @react-pdf-viewer/default-layout

### Installation and Running the Project

1. **Backend:**
* Clone the repository: `git clone [repository URL]`
* Navigate to the backend directory: `cd backend`
* Install dependencies: `npm install`
* Create a `.env` file in the root directory of the backend and add the following environment variables:
* `AWS_ACCESS_KEY_ID`: Your AWS Access Key ID.
* `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Access Key.
* `JWT_SECRET`: A unique secret key for generating JWT tokens.
* Start the backend server: `npm start`
2. **Frontend:**
* Clone the repository: `git clone [repository URL]`
* Navigate to the frontend directory: `cd frontend`
* Install dependencies: `npm install`
* Start the frontend development server: `npm start`

### Configuration Settings

* **Backend:**
* **Database Configuration:** Modify the database connection settings in `backend/index.js` to match your MySQL server
configuration.
* **AWS Credentials:** Ensure your AWS Access Key ID and Secret Access Key are correctly set in the `.env` file.
* **Email Notification Topic:** Modify the `TopicArn` in the `sendEmailForAddition` function in `backend/index.js` to
match your Amazon SNS topic ARN for sending emails.

* **Frontend:**
* **API Endpoint:** Ensure the `url` variable in `frontend/src/Components/context.jsx` correctly points to your backend
API endpoint.

### Testing

* **Backend:**
* Currently, there are no dedicated unit tests for the backend. Consider implementing tests using frameworks like Jest
or Mocha.
* **Frontend:**
* Run the test suite: `npm test`

### Contributing

* **Fork** the repository.
* **Create a new branch** for your feature or bug fix.
* **Commit** your changes with clear and concise commit messages.
* **Push** your changes to your branch.
* **Create a pull request** to the original repository.

### Licensing

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
