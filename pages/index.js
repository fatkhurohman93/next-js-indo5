import { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Button, Input } from "antd";

const getMessageList = async () => {
  const response = await axios.get(
    "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/message"
  );

  return response;
};

const createMessageList = async (data) => {
  const response = await axios.post(
    "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/message",
    { ...data }
  );

  return response;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [state, setState] = useState({ username: "", message: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setState({ ...state, username: user.username });
    }
    (async () => {
      const result = await getMessageList();
      setMessageList(result.data);
    })();
  }, []);

  const handleMessage = (e) => {
    const message = e.target.value;
    setState({ ...state, message });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    await createMessageList(state);
    const result = await getMessageList();
    setMessageList(result.data);
    setState({ ...state, message: "" });
    setIsLoading(false);
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2em",
      }}
    >
      {messageList.length > 0 ? (
        <div>
          <div style={{ margin: "1em 0" }}>
            {messageList.map((d) => (
              <div
                style={{
                  padding: "1em",
                  borderRadius: "5px",
                  background:
                    state.username === d.username ? "#cee6ff" : "#eee",
                  marginBottom: "1em",
                  width: "90%",
                  float: state.username === d.username ? "right" : "left",
                }}
                key={d.id}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {d.username}
                </div>
                <div>{d.message}</div>
              </div>
            ))}
          </div>
          <Divider />
          <Input
            type="text"
            placeholder="message"
            onChange={handleMessage}
            value={state.message}
          />
          <Button
            style={{ width: "100%", marginTop: "1em" }}
            onClick={handleCreate}
            loading={isLoading}
          >
            Submit Message
          </Button>
          {/*<h1 style={{ textAlign: "center", fontSize: "50px" }}>👊</h1>*/}
          {/*<h1>Index Page</h1>*/}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ width: "100px" }} alt="loading" src="/loading.gif" />
        </div>
      )}
    </main>
  );
}
