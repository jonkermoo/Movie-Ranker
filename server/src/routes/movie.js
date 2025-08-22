import { Router } from "express";
import axios from "axios";
import { env } from "../env.js"

const router = Router();

router.get("/:imdbID", async (req, res) => {
  const { imdbID } = req.params;
  // instead of a string query, it's a route parameter
  // deconstruct imdbID, taken from req.params

  try {
    const url = `https://www.omdbapi.com/?apikey=${env.OMDB_KEY}&i=${encodeURIComponent(imdbID)}&plot=short`;
    const { data } = await axios.get(url);

    if (data.Response == "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({
      imdbID: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
      plot: data.Plot && data.Plot !== "N/A" ? data.Plot : "No plot available.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Movie fetch failed" });
  }
});

export default router;