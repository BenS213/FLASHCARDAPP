import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import { createDeckController } from './controllers/createDeckController';
import { getDecksController } from './controllers/getDecksController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { getDeckController } from './controllers/getDeckController';
import { deleteCardController } from './controllers/deleteCardController';
config();

const PORT = 5000;

const app = express();
app.use(cors({
    origin: '*',
}))
app.use(express.json());

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardController);

const db = mongoose.connect(process.env.MONGO_URL!)
.then(() => {
    app.listen(PORT);
    console.log(`listening on port ${PORT}`)
});
