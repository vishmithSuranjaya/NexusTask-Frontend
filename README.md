

## NexusTask - Frontend

🌌 **NexusTask** is a high-performance task management ecosystem designed for developers who value speed, structure, and a clean user interface. Built as a modern Single Page Application (SPA), it provides a seamless experience for organizing workflows, tracking deadlines, and managing project lifecycles.

### 🚀 Core Features

- **Smart Prioritization:** Categorize tasks into Low, Medium, and High priority with real-time color coding (Emerald, Amber, and Rose).
- **Soft Delete & Recovery:** Move tasks to a "Trash" view to prevent accidental data loss, with the ability to restore or permanently delete items.
- **Optimistic UI:** Experience zero-latency updates when filtering or toggling task status from "Pending" to "Completed." 
- **Paginated Interface:** A structured two-column grid that displays 4 tasks per page to ensure high performance and scannability.
- **Secure Auth:** Fully integrated with Laravel Sanctum for rock-solid, token-based authentication.

### 🛠️ Tech Stack

- **Framework:** React.js (Vite Template)
- **Styling:** Tailwind CSS
- **State & Logic:** Functional Components & Hooks (`useState`, `useEffect`)
- **API Client:** Axios
- **Icons:** Heroicons / Lucide-React

### 📥 Installation & Setup

Follow these steps to get the frontend environment running locally.

1. Clone the Repository

```bash
git clone https://github.com/vishmithSuranjaya/nexustask-frontend.git
cd nexustask-frontend
```

2. Install Dependencies

```bash
npm install
```

3. Environment Configuration

Create a `.env` file in the root directory and point it to your Laravel backend:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173.

### 🏗️ Project Structure

- `src/Components/`: Reusable UI elements like Navbar, Modal, and TaskCard.
- `src/Pages/`: Top-level views including Homepage, About, and Tasks.
- `src/App.jsx`: Main routing and authentication state management.

### 🛡️ Security Note

This frontend expects a valid Sanctum Bearer Token stored in `localStorage` under the key `ACCESS_TOKEN`. Ensure the Laravel backend is running and migrations are migrated with `softDeletes` enabled to support the trash functionality.

Developed by Vishmith Suranjaya — Undergraduate Student at Uva Wellassa University
