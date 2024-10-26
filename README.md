## Client side deploy(netlify) link: https://easy-deals-client.netlify.app/ 
## Live deploy (Render) link: https://easy-deals-server.onrender.com/

# User Management Dashboard

This is a full-stack user management dashboard where users can register, log in, view and update their profiles, and where admins can manage users' roles and statuses.

## Features

- **User Registration**: Users can sign up by providing their name, phone number, photo URL, address, email, and password.
- **Login and Authentication**: User authentication is handled by Firebase, and email addresses cannot be changed once registered.
- **MongoDB Integration**: After registration, user details are stored in MongoDB, and each user is linked to Firebase via a unique UID.
- **Role-Based Dashboard**:
  - **Admin Dashboard**: Admin users can view all registered users, change their roles (Admin/User), block/unblock users, and monitor system activity.
  - **User Dashboard**: Regular users can view and update their profile details (except email, role, and block status).
- **Super Admin**: 
  - The Super Admin role is fixed and cannot be changed. The Super Admin is always active.
- **Blocked Users**: Blocked users will only see their profile page and the option to log out. They cannot access other features or update their profile details.

## Key Functionality

1. **Registration**: 
   - New users register via Firebase by providing their basic information.
   - After registration, user data is sent to MongoDB with a unique UID for linking Firebase and MongoDB.
   - By default, users are assigned the role of 'User' and are 'Active'.

2. **Login**:
   - Users log in via Firebase authentication.
   - After successful login, users are redirected to their respective dashboards based on their role:
     - **Admin Dashboard**: Allows admins to manage user roles and status.
     - **User Dashboard**: Allows users to view and edit their profile details.

3. **Admin Features**:
   - Admins can view all users and change their roles between 'Admin' and 'User'.
   - Admins can block or unblock users.
   - A blocked user cannot access any feature except viewing their profile and logging out.

4. **User Features**:
   - Users can update their profile details (name, phone, photo URL, address) but cannot change their email, role, or active/block status.
   - Blocked users have limited access to only their profile and a logout option.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase (for login and user authentication)
- **State Management**: Redux (for handling authentication state and data)

## Admin Credentials

To log in as the Super Admin, use the following credentials:

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repo-link>
   cd <repo-folder>
2. Install the dependencies:
    ```bash
   git clone <repo-link>
   cd <repo-folder>

3. Set up Firebase:
    Add your Firebase configuration details to the .env file.
    Enable Firebase Authentication for Email/Password sign-in.

4. Set up MongoDB:
    Create a MongoDB database and add the URI to the .env file.
    Run the project:
    ```bash
    Copy code
    npm run dev