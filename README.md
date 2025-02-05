### Fullstack Blog List App

1. Start by running npm install inside the cloned project folder

2. Build frontend using npm run build:client

3. Create .env file and configure the following variables with your values: SECRET (for jwt tokens), MONGODB_URI + TEST_MONGODB_URI and optionally PORT

4. npm run start:server / dev:server to quickly spin-up production / development an express app available at localhost:3003 that server static files of the built frontend!

5. Testing commands:
   - npm run test:client for frontend unit tests
   - npm run test:server for backend integration tests
   - npm run test:e2e for Playwright end-to-end tests

##### Deployment

- fly.io:

##### CI/CD

- CI system: GitHub Actions with custom workflows. Includes deployment pipeline workflow to test, lint, build, deploy, add tag versioning plus a health check workflow

##### Some of Libraries / Tools / Frameworks:

- Frontend/Client: React + Vite
- Backend/Server: Express. Database solution: MongoDB.
- Server state management accomplished with TanStack Query and routing accomplished with React Router.
- UI component library: Mantine

##### Testing

- End-to-end tests: Playwright
- Frontend Unit tests: Vitest + React Testing Library + jsdom
- Backend Integration tests: supertest
