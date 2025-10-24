import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = `https://chatify-server-cit8.onrender.com${req.url.replace(
      "/api/proxy",
      ""
    )}`;

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { ...req.headers },
      withCredentials: true, // important for cookies
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
}
