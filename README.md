# Job Tracker App

A modern React-based application to track job applications, follow-ups, and statuses.

## Features
- Add, view, edit, and delete job applications
- Search applications by company or role
- Update application status (Applied, Interview, Offer, Rejected)
- Follow-up dates and notes for each application
- Graphical Recharts showing all the applied job's statuses
- Dark/light theme toggle
- Real-time notifications using React Toastify
- Data persistence using localStorage

## Tech Stack
- React.js (Functional components)
- React Router for navigation
- TailwindCSS for styling
- React Toastify for notifications
- LocalStorage for data persistence

## Installation
1. Clone the repo:
   ```bash
   git clone <repo-url>

2. Navigate to the project folder:
   cd job-tracker

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

   Open your browser at http://localhost:3000 - for local development



## Usage

1. **Add a New Application**  
   - Click on **“+ Add”** or navigate to the **Add Application** page.  
   - Fill in all required fields such as **Company**, **Job Role**, and **Application Date**.  
   - Optionally add **Location**, **Source**, **Job URL**, **Resume Link**, **Follow-up Date**, and **Notes**.  
   - Click **Save** to add the application.

2. **View Applications**  
   - All applications are displayed on the **Dashboard** in a table (desktop) or card layout (mobile).  
   - Each entry shows company, role, date, location, source, status, and follow-up date.

3. **Update Application Status**  
   - Use the **Status dropdown** to update the current status (Applied, Interview, Offer, Rejected).  
   - A toast notification confirms the status update.

4. **Delete an Application**  
   - Click **Delete** on the desired application.  
   - Confirm the deletion in the popup.  
   - A toast notification confirms successful deletion.

5. **Search Applications**  
   - Use the **search bar** to filter applications by company or role in real time.

6. **Toggle Theme**  
   - Click the **theme toggle button** on the topbar to switch between **light** and **dark mode**.

7. **Data Persistence**  
   - All data is saved in **localStorage**, ensuring applications persist across page reloads.  
   - Note: Clearing browser data will remove all stored applications.
   