# AI Article Generator

A modern Next.js application that generates professional 500-word articles using AI through an n8n workflow integration.

## Features

- ✨ Clean and modern UI with gradient backgrounds
- 🤖 AI-powered article generation via n8n + Groq API
- 📝 Real-time article generation
- 📋 One-click copy to clipboard
- ⚡ Fast and responsive
- 🎨 Beautiful animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
```bash
cd article-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## Environment Variables

The API URL is hardcoded in the application. If you need to change it, update the fetch URL in `app/page.tsx`:

```typescript
const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
  // ...
});
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: n8n Webhook + Groq AI (llama-3.1-8b-instant)

## How It Works

1. User enters a topic in the input field
2. Frontend sends POST request to n8n webhook
3. n8n workflow processes the request:
   - Creates a prompt
   - Sends to Groq API
   - Formats the response
4. Frontend receives and displays the generated article
5. User can copy the article to clipboard

## Project Structure

```
article-generator/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
├── .env.local           # Environment variables
└── package.json         # Dependencies
```

## License

MIT
