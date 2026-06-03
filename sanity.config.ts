import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import React from 'react';

const CardGeneratorTool = () => {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '400px',
        padding: '2rem',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
    },
    React.createElement('h1', { style: { marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 600 } }, 'Business Card Generator'),
    React.createElement('p', { style: { marginBottom: '2rem', color: '#666', maxWidth: '400px' } }, 'Generate and print physical business cards using your portfolio data.'),
    React.createElement(
      'a',
      {
        href: '/card',
        target: '_blank',
        rel: 'noopener noreferrer',
        style: {
          display: 'inline-block',
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }
      },
      'Open Printing Studio'
    )
  );
};

export default defineConfig({
  name: 'default',
  title: 'Christian Kazi Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_hash_here',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: [],
  },
  tools: (prev) => [
    ...prev,
    {
      name: 'card-generator',
      title: 'Card Generator',
      component: CardGeneratorTool,
    },
  ],
});
