import Games from "../models/Games.js";
import { validationResult } from "express-validator";

// Create a new game
export const createGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const game = await Games.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a game
export const updateGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const game = await Games.findOneAndUpdate(req.params.title, req.body, {
      new: true,
    });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a game
export const deleteGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const game = await Games.findOneAndDelete(req.params.title);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all games
export const getAllGames = async (req, res) => {
  try {
    const games = await Games.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single game by name
export const getGameByName = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const game = await Games.findOne({ title: req.params.title });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getGamesByGenre = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const games = await Games.find({ genre: req.params.genre });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGamesByPlatform = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const games = await Games.find({ platform: req.params.platform });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGamesByReleaseYear = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const games = await Games.find({ releaseYear: req.params.releaseYear });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};