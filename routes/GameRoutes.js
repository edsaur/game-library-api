import express from "express";
import { createGame, deleteGame, getAllGames, getGamesBySearch, updateGame } from "../controllers/GameController.js";
import {body, param} from "express-validator";
import { protect } from "../middlewares/authMiddleware.js";


const gameRouter = express.Router();

// Create new game
gameRouter.post('/', protect, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('genre').not().isEmpty().withMessage('Genre is required'),
    body('platform').not().isEmpty().withMessage('Platform is required'),
    body('releaseYear').isInt().withMessage('Release year must be a number'),
    body('description').not().isEmpty().withMessage('Description is required'),
], createGame);

// Update game
gameRouter.put('/:id', protect, [
    param('id').isMongoId().withMessage('Invalid ID format'),
], updateGame);

// Delete game
gameRouter.delete('/:id', protect, [
    param('id').isMongoId().withMessage('Invalid ID format'),
], deleteGame);

// Get all games
gameRouter.get("/", getAllGames);


// Search games
gameRouter.get("/search", getGamesBySearch);


export default gameRouter;
