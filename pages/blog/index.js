import { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Button, Input } from "antd";
import Link from "next/link";

const getblogList = async () => {
  const response = await axios.get(
    "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/blog"
  );

  return response;
};

const createblogList = async (data) => {
  const response = await axios.post(
    "https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/blog",
    { ...data }
  );

  return response;
};

export default function Blog() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [state, setState] = useState({ author: "", content: "", title: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setState({ ...state, author: user.username });
    }
    (async () => {
      const result = await getblogList();
      setBlogList(result.data);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    await createblogList(state);
    const result = await getblogList();
    setBlogList(result.data);
    setState({ ...state, content: "", title: "" });
    setIsLoading(false);
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        paddingTop: "3em",
      }}
    >
      {blogList.length > 0 ? (
        <div>
          <div style={{ marginBottom: "1em 0" }}>
            {blogList.map((d) => (
              <div
                style={{
                  paddingBottom: "1em",
                  borderRadius: "5px",
                  marginBottom: "1em",
                  width: "100%",
                  color: "#000",
                  borderBottom: "1px solid #eee",
                }}
                key={d.id}
              >
                <Link href="#">
                  <a style={{ color: "#000", fontWeight: 500 }}>{d.title}</a>
                </Link>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    margin: ".5em 0",
                  }}
                >
                  <div style={{marginRight:'1em'}}>
                    Author:{' '}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#333",
                        padding: ".3em",
                        background: "#eee",
                        borderRadius: "5px",
                      }}
                    >
                      {d.author}
                    </span>
                  </div>
                  <div style={{marginRight:'1em'}}>
                    Date:{' '}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#333",
                        padding: ".3em",
                        background: "#eee",
                        borderRadius: "5px",
                      }}
                    >
                      {d.createdAt}
                    </span>
                  </div>
                </div>
                <div style={{ fontStyle: "italic" }}>
                  {d.content.slice(0, 100)}...
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={state.title}
            style={{ marginBottom: "1em" }}
          />
          <Input.TextArea
            type="text"
            name="content"
            onChange={handleChange}
            value={state.content}
            style={{ marginBottom: "1em" }}
          />
          <Button
            style={{ width: "100%" }}
            onClick={handleCreate}
            loading={isLoading}
          >
            Submit Blog
          </Button>
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
