# Fullstack Blog List App

## Commands

1. Start by running `npm install` inside the cloned project folder.

2. Build the frontend using:

   ```
   npm run build:client
   ```

3. Create a `.env` file and configure the following variables with your values:

   - `SECRET` (for JWT tokens)
   - `MONGODB_URI` + `TEST_MONGODB_URI`
   - (Optional) `PORT`

4. Start the server:

   - For production:
     ```
     npm run start:server
     ```
   - For development:
     ```
     npm run dev:server
     ```
     The server will be available at `http://localhost:3003`, serving static files of the built frontend.

5. Testing commands:
   - Frontend unit tests:
     ```
     npm run test:client
     ```
   - Backend integration tests:
     ```
     npm run test:server
     ```
   - Playwright end-to-end tests:
     ```
     npm run test:e2e
     ```

## Deployment

- fly.io: [blogApp](https://blogapp-fso.fly.dev)

## CI/CD

- **CI System:** GitHub Actions with custom workflows:
  - Deployment pipeline workflow: test, lint, build, deploy, add tag versioning.
  - Health check workflow.

## Libraries / Tools / Frameworks

- **Frontend/Client:** React + Vite
- **Backend/Server:** Express
- **Database:** MongoDB
- **Server State Management:** TanStack Query
- **Routing:** React Router
- **UI Component Library:** Mantine

## Testing

- **End-to-End Tests:** Playwright
- **Frontend Unit Tests:** Vitest + React Testing Library + jsdom
- **Backend Integration Tests:** Supertest
