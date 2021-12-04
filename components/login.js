import { Layout, Input, Button, message } from "antd";
import { useEffect, useState } from "react";

const fetchLogin = async (username, password) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });

  return response.json();
};

const fetchRegister = async (username, password, email, role) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ username, password, email, role }),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });

  return response.json();
};

export default function Login() {
  return (
    <Layout>
      <Background />
      <LoginComponent />
      <CopyRight />
    </Layout>
  );
}
const CopyRight = () => {
  return (
    <div style={Style.copyright}>
      <p style={{ fontSize: "40px", margin: 0 }}>👨🏻‍💻</p>
      Copyright by Akbarpathur
    </div>
  );
};

const LoginComponent = () => {
  const [successLogin, setSuccessLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [logSwitch, setLogSwitch] = useState("login");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError(false);
      setIsLoading(false);
    }, 1000);
  }, [message]);

  const handleLogin = async () => {
    const { username, password } = loginData;
    setIsLoading(true);
    if (!username || !password) {
      setMessage("Username dan password tidak boleh kosong");
      setError(true);
      return false;
    }
    const response = await fetchLogin(username, password);
    if (response.success) {
      localStorage.setItem("user", JSON.stringify(response));
      setSuccessLogin(true);
      window.location.reload("/");
    } else {
      setMessage(response.message);
      setError(true);
    }
    setIsLoading(false);
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    if (name === "retypePassword" && !(registerData.password === value)) {
      setMessage("Password tidak sama");
      setError(true);
    }
    if (name === "retypePassword" && registerData.password === value) {
      setMessage("Password sudah sama");
      setError(false);
    }

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const { username, password, retypePassword, email, role } = registerData;
    setIsLoading(true);

    if (password !== retypePassword) {
      setMessage("Password tidak sama");
      setError(true);
      return -1;
    }

    const response = await fetchRegister(username, password, email, role);

    if (response.success) {
      setMessage("Berhasil registrasi");
      setLogSwitch("login");
      setLoginData({ ...loginData, username: response.data.username });
      setRegisterData({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        role: "user",
      });
    } else {
      setMessage(response.message);
      setError(true);
    }

    setIsLoading(false);
  };
  return (
    <section style={Style.wrapper}>
      {successLogin ? (
        <div
          style={{
            background: "#ffffff90",
            padding: ".7em",
            marginTop: "1em",
            color: error ? "red" : "green",
            position: "absolute",
            top: "20vh",
            width: "280px",
            textAlign: "center",
          }}
        >
          Login Success
        </div>
      ) : (
        <div>
          <div
            style={{
              marginBottom: "2em",
              background: "#FFFFFF95",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              onClick={() => {
                setLogSwitch("login");
              }}
              style={{
                width: "50%",
                textAlign: "center",
                padding: "1em",
                cursor: "pointer",

                ...(logSwitch === "login"
                  ? {
                      background: "rgb(1 96 133 / 93%)",
                      color: "#fff",
                    }
                  : {}),
              }}
            >
              Login
            </div>
            <div
              onClick={() => {
                setLogSwitch("register");
              }}
              style={{
                width: "50%",
                textAlign: "center",
                padding: "1em",
                cursor: "pointer",
                ...(logSwitch === "register"
                  ? {
                      background: "rgb(1 96 133 / 93%)",
                      color: "#fff",
                    }
                  : {}),
              }}
            >
              Register
            </div>
          </div>
          {message && (
            <div
              style={{
                background: "#ffffff90",
                padding: ".7em",
                marginTop: "1em",
                color: error ? "red" : "green",
                position: "absolute",
                top: "20vh",
                width: "280px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
          {logSwitch === "login" ? (
            <>
              <div style={Style.login}>
                <div
                  style={{
                    marginBottom: ".5em",
                    textAlign: "center",
                    fontSize: "40px",
                  }}
                >
                  🕵️
                </div>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={handleChangeLogin}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  style={{ marginBottom: "1em" }}
                />
                <Input
                  type="password"
                  name="password"
                  value={loginData.password}
                  placeholder="Password"
                  onChange={handleChangeLogin}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  style={{ marginBottom: "1em" }}
                />
                <Button
                  loading={isLoading}
                  onClick={handleLogin}
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </div>
            </>
          ) : (
            <div style={Style.signup}>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleChangeRegister}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // handleLogin();
                  }
                }}
                style={{ marginBottom: "1em" }}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleChangeRegister}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // handleLogin();
                  }
                }}
                style={{ marginBottom: "1em" }}
              />
              <Input
                type="password"
                name="retypePassword"
                value={registerData.retypePassword}
                placeholder="Retype Password"
                onChange={handleChangeRegister}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // handleLogin();
                  }
                }}
                style={{ marginBottom: "1em" }}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleChangeRegister}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // handleLogin();
                  }
                }}
                style={{ marginBottom: "1em" }}
              />

              <Button
                loading={isLoading}
                onClick={handleRegister}
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

const Background = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    ></div>
  );
};

const Style = {
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    width: "280px",
    height: "300px",
    background: "#ffffff95",
    padding: "2em",
    boxShadow: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  signup: {
    width: "280px",
    height: "300px",
    background: "#ffffff95",
    padding: "2em",
    boxShadow: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  copyright: {
    position: "absolute",
    bottom: "5vh",
    textAlign: "center",
    width: "100%",
    color: "#fff",
  },
};
