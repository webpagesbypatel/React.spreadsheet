React Spreadsheet UI
An interactive, feature-rich spreadsheet-like interface built with React, Tailwind CSS, and TypeScript. This project demonstrates a modern, user-friendly table UI for managing user data with a focus on accessibility, responsiveness, and high usability.

🚀 Features
Spreadsheet-style Table UI
View and edit data in an intuitive, Excel-like grid format, making data manipulation simple and efficient.

Sorting by Columns
Click on any column header to toggle between ascending/descending sorting. Visual indicators highlight the current sort direction.

Column Resizing
Resize columns by dragging the edge of the column header. Minimum widths are enforced to maintain readability.

Row Highlighting on Hover
As you hover over a row, it is highlighted to make tracking data across wide tables easier.

Sticky Table Header
The table header remains visible as you scroll, ensuring context is always available while interacting with large datasets.

Editable Cells
Double-click (or press Enter) on editable cells (e.g., Name, Email, Role) to modify their values inline. Built-in validation ensures correct inputs in the Role column.

Column Visibility Toggling
Dynamically toggle visibility of columns via the 'Columns' dropdown to focus on relevant data.

Keyboard Navigation
Navigate the table with keyboard shortcuts: use arrow keys to move between cells, press Enter to start editing, and Escape to cancel editing.

Responsive Design
The UI adapts to various screen sizes, ensuring smooth use on desktop and mobile devices alike.

Accessible Interactions
All table elements are fully accessible via keyboard and screen readers, with proper ARIA roles and focus management.

User Data Management
Easily update user data directly in the table, with real-time UI updates reflecting any changes.

Status Badges
User status is indicated visually with colored badges (e.g., Active, Inactive, Pending) for quick recognition and enhanced user management.

Date Formatting
Display dates in a user-friendly format (e.g., "Jan 15, 2023") for better readability.

Dynamic Data Updates
Real-time updates to data as the user makes changes, without needing to refresh the page.

💻 Demo
Once the app is running locally, you can view it at http://localhost:5173.

📦 Installation
Prerequisites
Ensure you have Node.js (v16 or higher) and npm installed on your machine.

Steps to Run Locally
Clone the repository:

sh
Copy
git clone <repo-url>
cd react-spreadsheet-ui
Install the required dependencies:

sh
Copy
npm install
🏃‍♂️ Usage
Running the Development Server
To start the development server, run the following command:

sh
Copy
npm run dev
This will launch the app at http://localhost:5173 by default.

Building for Production
To build the app for production, use:

sh
Copy
npm run build
Previewing the Production Build
To preview the production build locally:

sh
Copy
npm run preview
🔧 Project Structure
Here’s an overview of the key files and folders in this project:

App.tsx: The main component that manages the state and renders the spreadsheet UI.

components/SpreadsheetTable.tsx: The core spreadsheet table component, which contains all of the spreadsheet functionality.

components/icons.tsx: Contains SVG icon components used across the UI.

types.ts: TypeScript types defining the structure of user data and columns.

vite.config.ts: Configuration file for Vite (build tool).

index.html / index.tsx: Entry point of the application.

🎨 Customization
You can easily customize the spreadsheet columns and the data within App.tsx. The design relies on Tailwind CSS for styling (see index.html for the CDN import). You can modify the styling and design by editing the tailwind.config.js file.

⚙️ Advanced Features
Performance Optimization
If you're working with a large dataset, consider optimizing the sorting and filtering mechanisms to improve performance.

Persistence & API Integration
Integrate with a backend (e.g., REST API) to store data persistently across sessions.

Unit and Integration Testing
Add tests using Jest or React Testing Library to ensure the reliability of features like sorting, resizing, and inline editing.

Accessibility Enhancements
Ensure all actions are accessible via keyboard, screen readers, and ARIA roles for a better user experience.

📝 Author Information
This project was created by Susheel, who is passionate about React, TypeScript, UI/UX design, and modern frontend technologies. This project demonstrates advanced skills in React and TypeScript, along with best practices in UI/UX.

Feel free to use, modify, or extend this project for your own needs! Contributions and feedback are welcome.
