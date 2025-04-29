import express from "express";
import { createGame, deleteGame, getAllGames, getGamesBySearch, updateGame } from "../controllers/GameController.js";
import {body, param} from "express-validator";

const gameRouter = express.Router();

// Create new game
gameRouter.post('/', [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('genre').not().isEmpty().withMessage('Genre is required'),
    body('platform').not().isEmpty().withMessage('Platform is required'),
    body('releaseYear').isInt().withMessage('Release year must be a number'),
    body('description').not().isEmpty().withMessage('Description is required'),
], createGame);

// Update game
gameRouter.put('/:id', [
    param('id').isMongoId().withMessage('Invalid ID format'),
], updateGame);

// Delete game
gameRouter.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid ID format'),
], deleteGame);

// Get all games
gameRouter.get("/", getAllGames);


// Search games
gameRouter.get("/search", getGamesBySearch);


export default gameRouter;
