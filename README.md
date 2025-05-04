# Todo App

A modern Todo application built with Next.js and TypeScript. The app allows you to create, edit, and delete tasks. Completed tasks are automatically removed after 3 seconds.

## Features

- ✅ Create new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ⏱️ Automatic removal of completed tasks after 3 seconds
- 💾 Local storage for task persistence
- ⌨️ Enter key support for adding new tasks

## Technologies

- Next.js
- TypeScript
- React Hooks
- LocalStorage for data persistence

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Abduelhamit01/todo-app.git
```

2. Install dependencies:
```bash
cd todo-app
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter a new task in the input field and press Enter or click "Add"
- Click on a task to edit it
- Mark a task as completed to automatically remove it after 3 seconds
- Use the "Delete All" button to remove all tasks

## License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
