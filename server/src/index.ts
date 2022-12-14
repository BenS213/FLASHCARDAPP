import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import cors from 'cors';
import { config } from 'dotenv';
config();

const PORT = 5000;

const app = express();

app.use(cors({
    origin: '*',
}))
app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck)
});

app.get('/decks', async ( req: Request, res: Response) => {
    const decks = await Deck.find();
    res.json(decks)
});

app.delete('/decks/:deckId', async ( req: Request, res: Response) => {
    // find the deck requested
    const deckId = req.params.deckId;
    // remove the deck from the database
    const deck = await Deck.findByIdAndDelete(deckId)
    // return the deleted deck to the user
    res.json(deck)
})

const db = mongoose.connect(process.env.MONGO_URL!)
.then(() => {
    app.listen(PORT);
    console.log(`listening on port ${PORT}`)
});
