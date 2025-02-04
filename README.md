# NeenOpal Task

This project was developed as a technical assessment task for NeenOpal, demonstrating modern web development practices using React, TypeScript, and various other technologies.

## Deployed Application
The application is currently deployed at: [https://neenopal-task-six.vercel.app/](https://neenopal-task-six.vercel.app/)

## Feature Demonstration
Watch this video to see all features in action:


https://github.com/user-attachments/assets/d555c507-deb2-4473-b07a-3769f235ab2e




### Interactive Features

#### Node Customization
- **Right-Click Menu Options:**
  - Change text color
  - Modify background color
  - Adjust font size

#### Edge Management
- **Remove Edge:** Double-click on any edge to remove it
- **Connect Nodes:** Click on a node's connection point and drag to another node's connection point

#### Node Manipulation
- **Position Changes:** Drag nodes freely to reposition them

#### History Control
- **Undo/Redo Functionality:**
  - Use control buttons to undo/redo:
    - Position changes
    - Color modifications
    - Background color updates
    - Text size adjustments
    - Node connections
    - Edge removals
- **Change Tracking:** Click the "Track Change" button in the top right to view modification history



## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```


## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm test` - Run tests

## Dependencies

### Core Dependencies
- `@headlessui/react` - UI components for React
- `@reduxjs/toolkit` - State management toolkit
- `@tailwindcss/vite` - Tailwind CSS integration for Vite
- `@xyflow/react` - Flow diagram library for React
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-redux` - React bindings for Redux
- `redux` - State management
- `tailwind-merge` - Tailwind class merging utility
- `tailwindcss-animate` - Animation utilities for Tailwind
- `uuid` - UUID generation

### Development Dependencies
- `@eslint/js` - ESLint JavaScript configuration
- `@types/node` - TypeScript definitions for Node.js
- `@types/react` - TypeScript definitions for React
- `@types/react-dom` - TypeScript definitions for React DOM
- `@vitejs/plugin-react` - Vite plugin for React
- `autoprefixer` - CSS vendor prefix automation
- `eslint` - Code linting
- `eslint-plugin-react-hooks` - ESLint rules for React Hooks
- `eslint-plugin-react-refresh` - ESLint plugin for React Refresh
- `globals` - Global variables for ESLint
- `postcss` - CSS transformation tool
- `prettier` - Code formatting
- `tailwindcss` - Utility-first CSS framework
- `typescript` - TypeScript language
- `typescript-eslint` - TypeScript ESLint integration
- `vite` - Build tool and dev server

## Basic Usage Guide

### Project Structure
```
src/
├── api/         # API related functions and services
├── assets/      # Static assets
├── components/  # React components
├── hooks/       # Custom React hooks
├── store/       # Redux store configuration and slices
├── utils/       # Utility functions and helpers
└── App.tsx      # Root component
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
