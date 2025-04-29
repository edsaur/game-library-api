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
    const game = await Games.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
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
    const game = await Games.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

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

// Get games by search
export const getGamesBySearch = async (req, res) => {
  const { title, genre, platform, releaseYear } = req.query;

  try {
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (genre) {
      const genresArray = genre.split(",").map((g) => g.trim());
      filter.genre = { $regex: genresArray.join("|"), $options: "i" };
    }

    if (platform) {
      const platformsArray = platform.split(",").map((p) => p.trim());
      filter.platform = { $regex: platformsArray.join("|"), $options: "i" };
    }

    if (releaseYear) {
      filter.releaseYear = releaseYear;
    }

    const games = await Games.find(filter);

    if (games.length === 0) {
      return res
        .status(404)
        .json({ message: "No games found matching your search criteria." });
    }

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

