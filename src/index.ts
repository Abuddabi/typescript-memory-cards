import * as fs from "fs/promises";
import * as readline from "readline/promises";
import { stdin, stdout } from "process";

// Simple flashcard class
class Flashcard {
  question: string;
  answer: string;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }
}

// Deck of flashcards
class Deck {
  name: string;
  cards: Flashcard[];

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  addCard(card: Flashcard) {
    this.cards.push(card);
  }

  // RECURSION: Find card by question text
  findCard(query: string, index: number = 0): Flashcard | null {
    if (index >= this.cards.length) {
      return null;
    }

    const card = this.cards[index];
    if (card && card.question.toLowerCase().includes(query.toLowerCase())) {
      return card;
    }

    return this.findCard(query, index + 1);
  }

  // RECURSION: Count total cards recursively
  countCards(index: number = 0): number {
    if (index >= this.cards.length) {
      return 0;
    }
    return 1 + this.countCards(index + 1);
  }
}

// ASYNC: Save deck to file
async function saveDeck(deck: Deck): Promise<void> {
  try {
    const data = {
      name: deck.name,
      cards: deck.cards.map((c) => ({
        question: c.question,
        answer: c.answer,
      })),
    };
    await fs.writeFile("deck.json", JSON.stringify(data, null, 2));
    console.log("Deck saved!");
  } catch (error) {
    // EXCEPTION HANDLING
    console.error("Error saving deck:", error);
    throw new Error("Failed to save deck");
  }
}

// ASYNC: Load deck from file
async function loadDeck(): Promise<Deck | null> {
  try {
    const data = await fs.readFile("deck.json", "utf-8");
    const json = JSON.parse(data);
    const deck = new Deck(json.name);

    json.cards.forEach((card: any) => {
      deck.addCard(new Flashcard(card.question, card.answer));
    });

    console.log("Deck loaded!");
    return deck;
  } catch (error) {
    // EXCEPTION HANDLING
    console.log("No saved deck found, starting fresh");
    return null;
  }
}

// Main program
async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  console.log("=== Flashcard App ===\n");

  // Try to load existing deck
  let deck = await loadDeck();

  if (!deck) {
    const name = await rl.question("Enter deck name: ");
    deck = new Deck(name);
  }

  let running = true;

  while (running) {
    console.log("\n1. Add card");
    console.log("2. Study cards");
    console.log("3. Search card (uses recursion)");
    console.log("4. Show stats");
    console.log("5. Save and exit");

    const choice = await rl.question("\nChoose option: ");

    if (choice === "1") {
      // Add card
      const question = await rl.question("Question: ");
      const answer = await rl.question("Answer: ");
      deck.addCard(new Flashcard(question, answer));
      console.log("Card added!");
    } else if (choice === "2") {
      // Study cards - LISTS: iterate through array
      if (deck.cards.length === 0) {
        console.log("No cards yet!");
      } else {
        for (let i = 0; i < deck.cards.length; i++) {
          const card = deck.cards[i];
          if (card) {
            console.log(`\nQ: ${card.question}`);
            await rl.question("Press Enter to see answer...");
            console.log(`A: ${card.answer}`);
          }
        }
        console.log("\nDone studying!");
      }
    } else if (choice === "3") {
      // Search card - uses RECURSION
      const query = await rl.question("Search for: ");
      const found = deck.findCard(query);

      if (found) {
        console.log(`\nFound!\nQ: ${found.question}\nA: ${found.answer}`);
      } else {
        console.log("No card found");
      }
    } else if (choice === "4") {
      // Show stats - uses RECURSION to count
      const count = deck.countCards();
      console.log(`\nDeck: ${deck.name}`);
      console.log(`Total cards: ${count}`);
    } else if (choice === "5") {
      // Save and exit - ASYNC function
      await saveDeck(deck);
      running = false;
    }
  }

  rl.close();
  console.log("\nGoodbye!");
}

// Run the program
main();
