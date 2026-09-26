# AI Shipment Support Assistant

A small TypeScript GenAI project demonstrating LangChain.js and LangGraph.js.

## Features
- LLM query classification
- LangGraph state and conditional routing
- Shipment and account mock APIs
- Knowledge-base retrieval
- Prompt engineering
- AI-generated responses

## Flow

START -> classify -> shipment/account/general -> generateResponse -> END

## Setup

1. Copy `.env.example` to `.env`.
2. Add your OpenAI API key.
3. Install dependencies:
   `npm install`
4. Run:
   `npm run dev -- "Where is my shipment 123456789?"`

## Example queries

`npm run dev -- "Where is my shipment 123456789?"`

`npm run dev -- "Can you check account ACC1001?"`

`npm run dev -- "How can I order shipping supplies?"`

## Important
The shipment/account data is fictional mock data. Do not use real customer or company data.
