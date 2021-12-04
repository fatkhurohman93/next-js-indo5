import { Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "moment";
const getOneBlog = async (id) => {
  const response = await axios.get(
    `https://61aa4eacbfb110001773f1a5.mockapi.io/api/simple/blog/${id}`
  );

  return response;
};

export default function BlogDetail() {
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    author: "",
    content: "",
    createdAt: "",
    title: "",
  });

  useEffect(() => {
    setIsLoading(true);

    if (Router.isReady) {
      (async () => {
        const result = await getOneBlog(Router.query.id);
        console.log(result.data);
        setState(result.data);
        setIsLoading(false);
      })();
    }
  }, [Router.isReady]);
  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        paddingTop: "3em",
      }}
    >
      {isLoading ? (
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
      ) : (
        <>
          <div>
            <h3>{state.title}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                margin: ".5em 0",
              }}
            >
              <div style={{ marginRight: "1em" }}>
                Author:{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#333",
                    padding: ".3em",
                    background: "#eee",
                    borderRadius: "5px",
                  }}
                >
                  {state.author}
                </span>
              </div>
              <div style={{ marginRight: "1em" }}>
                Date:{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#333",
                    padding: ".3em",
                    background: "#eee",
                    borderRadius: "5px",
                  }}
                >
                  {Moment(state.createdAt).startOf("hour").fromNow()}
                </span>
              </div>
            </div>
            <article>{state.content}</article>
          </div>
          <Button
            style={{ width: "100%", marginTop: "2em" }}
            onClick={() => Router.push("/blog")}
          >
            Kembali
          </Button>
        </>
      )}
    </main>
  );
}
