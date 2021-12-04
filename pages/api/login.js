import axios from "axios";

export default async function handler(req, res) {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(500).json({ message: "Kesalahan parameter.", success: 0 });
  }

  try {
    const response = await axios.get(
      "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/userList"
    );

    const indexUser = response.data.findIndex(
      (data) => data.username == username && data.password === password
    );

    if (indexUser === -1) {
      return res
        .status(404)
        .json({ message: "Invalid username or password.", success: 0 });
    }

    return res.status(200).json({
      message: "Login Success",
      username: response.data[indexUser].username,
      role: response.data[indexUser].role,
      token: "123456",
      success: 1,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: 0 });
  }
}
