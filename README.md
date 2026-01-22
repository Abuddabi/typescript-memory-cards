# Overview

I created a simple flashcard app in TypeScript to help me learn the language. This program lets you create flashcards with questions and answers, study them, and save your progress to a file.

I wanted to practice TypeScript features like classes, async/await, and recursion while making something useful for studying.

[Software Demo Video](http://youtube.link.goes.here)

# Getting Started

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

## How to Use

1. When you start, it will ask for a deck name (or load an existing one)
2. Choose from the menu:
   - Add card: Create a new flashcard
   - Study cards: Go through your flashcards
   - Search card: Find a card by question (uses recursion)
   - Show stats: See how many cards you have
   - Save and exit: Save your deck to a file

## TypeScript Features

- **Classes**: `Flashcard` and `Deck` classes
- **Recursion**: `findCard()` and `countCards()` methods search recursively
- **Lists**: Array of flashcards in the deck
- **Async functions**: `saveDeck()` and `loadDeck()` use async/await
- **Exception handling**: Try/catch blocks for file operations
- **Terminal output**: All the console.log statements

# Development Environment

- TypeScript 5.x
- Node.js
- VS Code

The code uses TypeScript features like:

- Type annotations
- Classes
- Async/await
- ES modules

# Useful Websites

- [TypeScript Official Site](https://www.typescriptlang.org/) - Main documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Learning guide
- [Node.js fs/promises](https://nodejs.org/api/fs.html#promises-api) - For file operations

# Future Work

- Add ability to edit or delete cards
- Add categories or tags for cards
- Make a shuffle feature for studying
- Add a score tracker
- Export/import decks in different formats
