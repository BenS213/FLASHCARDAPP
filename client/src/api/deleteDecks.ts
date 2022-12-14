import { API_URL } from "./config";

export async function deleteDeck(deckId: string) {
    const deletedDeck = await fetch(`${API_URL}/decks/${deckId}`, {
        method:'DELETE',
      })
      return deletedDeck.json();
}