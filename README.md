# React table app

This is a React application that utilizes `zod` for schema validation and integrates with an external API to manage `users` and `animals` data. The application uses React Router for navigation and has a modal-based form for adding and updating records. The data is fetched dynamically and validated with `zod` schemas before being displayed in tables.

## Features
**API Integration :**
- Fetches data from an external API, with validation of the data structure.

<br>

**Data Management :**
- Users can view and manage `users` and `animals` data from separate pages.

<br>

**Dynamic Table Rendering :**
- The data is displayed in tables, and users can filter and interact with the records.

<br>

**Form Modal :**
- A modal allows users to add or edit records, with validation through Zod.

## Setup

### Prerequisites
- Node.js
- npm or yarn

### Installation

**Clone the repository :**

```
git clone <repository-url>
```
<br>

**Navigate to the project directory :**

```
cd <project-directory>
```
<br>

**Install the dependencies :**

```
npm install
```
or
```
yarn install
```
<br>

**Create a `.env` file in the root of the project and add the API URL :**

```
REACT_APP_API_URL=https://inqool-interview-api.vercel.app/api/
```
<br>

**Start the application :**
```
npm start
```
or
```
yarn start
```
<br>


## File Structure

```text
src/
├── components/           # Reusable UI
├── context/              # Context providers
├── layout/               # Layout components
├── pages/                # Page components
├── styles/               # SCSS styling files
├── typescript/           # TypeScript types, zod schemas end ENUMs
└── utils/                # Utility functions
```
