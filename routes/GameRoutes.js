import express from "express";
import { createGame, deleteGame, getAllGames, getGameByName, getGamesByGenre, getGamesByPlatform, getGamesByReleaseYear, updateGame } from "../controllers/GameController.js";
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
gameRouter.put('/:title', [
    param('title').not().isEmpty().withMessage('Title is required'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('genre').not().isEmpty().withMessage('Genre is required'),
    body('platform').not().isEmpty().withMessage('Platform is required'),
    body('releaseYear').isInt().withMessage('Release year must be a number'),
    body('description').not().isEmpty().withMessage('Description is required'),
], updateGame);

// Delete game
gameRouter.delete('/:title', [
    param('title').not().isEmpty().withMessage('Title is required'),
], deleteGame);

// Get all games
gameRouter.get("/", getAllGames);


// Get a single game by name
gameRouter.get("/:title", [
    param('title').not().isEmpty().withMessage('Title is required'),
], getGameByName);


gameRouter.get("/genre/:genre", [
    param('genre').not().isEmpty().withMessage('Genre is required'),
], getGamesByGenre);


gameRouter.get("/platform/:platform", [
    param('platform').not().isEmpty().withMessage('Platform is required'),
], getGamesByPlatform);


gameRouter.get("/releaseYear/:releaseYear", [
    param('releaseYear').not().isEmpty().withMessage('Release year is required'),
], getGamesByReleaseYear);
export default gameRouter;
