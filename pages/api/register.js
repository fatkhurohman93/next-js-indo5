import axios from "axios";

export default async function handler(req, res) {
  const { username, password, email, role } = req.body;

  if (!username && !password) {
    return res
      .status(500)
      .json({ message: "Kesalahan parameter.", success: 0 });
  }

  try {
    const response = await axios.post(
      "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/userList",
      { username, password, email, role }
    );

    return res
      .status(200)
      .json({ message: "success", success: 1, data: response.data });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: 0 });
  }
}
