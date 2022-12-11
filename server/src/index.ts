import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck'

const PORT = 5000;

const app = express();
app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {

    console.log(req.body);
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck)
});

const db = mongoose.connect('mongodb+srv://Ben:Li0Xm1rCB3s1xznZ@cluster0.zaxz4bx.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
});
