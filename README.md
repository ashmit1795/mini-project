
# Mini Project

This is a **mini-project** built as a web application using **Node.js**, **Express.js**, and **EJS** for the view layer. The project follows industry standards, includes user authentication, and implements **flash messages** for both success and error feedback using **express-session** and **connect-flash**. The app also integrates with a MongoDB database via **Mongoose**.



## Features

- User Authentication (Registration, Login, Logout)
- Flash messages for feedback (success/error)
- CRUD operations on posts
- Post liking functionality
- Protected routes with session-based authentication
- Session management with express-session
- Simple, clean UI using **Tailwind CSS**

### Tech Stack

- **Frontend**: 
  - **EJS** (Embedded JavaScript) for templating
  - **Tailwind CSS** for styling

- **Backend**: 
  - **Node.js** with **Express.js** framework
  - **Express-session** for session management
  - **Connect-flash** for flash messages

- **Database**: 
  - **MongoDB** (using **Mongoose** as an ODM)

- **Authentication**: 
  - **bcrypt** for password hashing
  - **JWT** (JSON Web Tokens) for token-based authentication

- **Development Tools**:
  - **Nodemon** for automatic server restarts during development
  - **Prettier** and **ESLint** for code formatting and linting

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ashmit1795/mini-project.git
cd mini-project
```
2. **Install dependencies:**
```bash
npm install
```
3. **Set up environment variables:**
To run this project, you will need to add the following environment variables to your .env file
```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
CLIENT_URL=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_LIFE=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_LIFE=7d
SESSION_SECRET=your_session_secret
```
4. **Start the development server**
```bash
npm run dev
```
The server will run on http://localhost:3000/

## Lessons Learned

Throughout the development of this project, I have gained valuable knowledge and skills, including:

- **EJS Templating:** Learned how to effectively use EJS for server-side rendering of dynamic content.
- **Flash Messages:** Implemented flash messages to provide feedback to users after actions.
- **Express-Session:** Gained experience in managing user sessions for a more personalized experience.
- **Debugging Techniques:** Enhanced my debugging skills to identify and resolve issues efficiently.
- **Industry Standards:** Familiarized myself with various industry standards and best practices for web development.

## Learning Source
This project was developed as part of the **Master Backend Development Series** by Harsh Vandana Sharma (YouTube channel: **Sheriyans Coding School**).

**Extra Add-On Features:**
- **Custom Redirects:** Implemented after actions such as login, registration, and post creation.
- **Flash Messages:** Utilized `express-session` and `connect-flash` for displaying temporary messages.
- **Industry Standards:** Followed proper industry standards throughout the development process.

## Conclusion

This mini-project has been a significant learning experience, allowing me to apply theoretical knowledge in a practical setting. By building a web application using EJS, express-session, and flash messages, I have developed a deeper understanding of backend development concepts. The implementation of custom redirects and adherence to industry standards have further enriched my skills. I look forward to building upon this foundation in future projects and continuing to enhance my expertise in web development.

## Related

Here are some related projects:

[Playtube - A Video Hosting Platform Backend](https://github.com/ashmit1795/backend-project)

