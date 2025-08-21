import { Router } from "express";
import axios from "axios";
import { env } from ".../env.js"

const router = Router();

// GET /api/search
router.get("/", async (req, res) => {
  const q = (req.query.q || "").trim();
  // read query string trim
  if (!q) {
    return res.json({ results: [], total: 0 });
  }
  // guard to avoid OMDb with an empty query

  try {
    const url = `https://www.omdbapi.com/?apikey=${env.OMDB_KEY}&type=movie&s=${encodeURIComponent(q)}`;
    // building the OMDb search URL
    // apikey = api key
    // type = movies (only movies, no series or shows)
    // s = OMDb's search parameter
    // encodeURIComponent(q) safely encodes spaces/special characters

    const { data } = await axios.get(url);
    // calls OMDb and destructures the Axios response
    // data is the JSON body OMDb returns

    if (data.Response === "False") {
      return res.json({ results: [], total: 0});
    }
    // OMDb returns "Response": "True" or "False"
    // if nothing found/error, it will return empty payload

    const results = (data.Search || []).map((m) => ({
      title: m.Title,
      year: m.Year,
      imdbID: m.imdbID,
      poster: m.Poster && m.Poster != "N/A" ? m.Poster : null,
    }));
    // uses data.Search to make it an array (or []) and iterate through
    // assigns title, year, etc, accordingly

    res.json({ results, total: Number(data.totalResults || results.length )});
    // sends JSON back to the client
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;