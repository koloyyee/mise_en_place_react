# Welcome to Mise en Place.

This term is from a term from the French kitchen term for "in-place" and get ready for service.

Mise en Place is a Task and Ticket Management System.
Users are able to see the current tasks, tickets, todo, rank them in priority, and see view them in table or detail format.

This is a client side of the full-stack application, login is fully supported by OAuth2.0 JWT. Persistent storage supported by Postgresql.

## To Run the Project.

### install dependencies

`pnpm install ` 

or

 `npm install`

### Run in dev mode (http://localhost:5173)

`pnpm run dev` 

or

 `npm run dev`

### Run in preview mode (http://localhost:4173)

`pnpm run build` 

`or`

`npm run build`

follow by:
`pnpm run preview` 

or

 `npm run preview`

## Goal

- User will have a dashboard to view the latest 5 todos, tickets or task.
- User can create, read, update, delete tasks, ticket other users.
- Assignee will get a notification after being assigned, Assigner will get notified if the task/ticket updated (priority, comment, etc.).
- User can send asynchronous message to message other users individually or group, in the system like an inbox.
- User can initiate an instant chat with another user.
- User can set detail profile information.
- (optional) set different read, write privilege on different topics.

## Technology

- TypeScript
- React
- Vite
- pnpm
- Zustand
