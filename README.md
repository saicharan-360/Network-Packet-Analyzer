
  # Untitled

  This is a code bundle for Untitled. The original project is available at https://www.figma.com/design/zuUwofimDb4EJoSmfUnfCr/Untitled.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run server` to start the backend API.

  Open a second terminal and run `npm run dev` to start the frontend development server.

Alternatively, run both backend and frontend together with:

```
npm run dev:all
```

  Backend API: `http://127.0.0.1:4000`

  Frontend app: `http://127.0.0.1:5173` (Vite may pick another port like `5174` if `5173` is in use)

You can override the API base URL for the frontend by setting the environment variable `VITE_API_BASE_URL`.

  ## Backend flow

  Backend structure:

  - `backend/server.js` starts the HTTP server.
  - `backend/config/` stores backend configuration.
  - `backend/routes/` maps API URLs to controllers.
  - `backend/controllers/` handles request actions.
  - `backend/services/` contains packet capture, report, and threat detection logic.
  - `backend/models/` creates packet and threat objects.
  - `backend/data/` stores the current analyzer state.
  - `backend/utils/` contains shared response helpers.

  The backend exposes a simulated network packet analyzer API:

  - `POST /api/capture/start` starts packet capture.
  - `POST /api/capture/stop` stops packet capture.
  - `POST /api/capture/clear` clears packets, protocol counts, traffic data, and threats.
  - `GET /api/state` returns live dashboard data.
  - `GET /api/report` exports a JSON report.

  This backend is ready for UI development and demos. Real packet sniffing can be added later with a packet capture driver/library such as Npcap plus a Node capture package.
  
