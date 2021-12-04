import "../styles/globals.css";
import "antd/dist/antd.css";
import Head from "next/head";
import Login from "../components/login";
import { useEffect, useState } from "react";
import Router from "next/router";
import { Menu } from "antd";
import {
  HomeOutlined,
  PicRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { isMobile } from "react-device-detect";

const MenuList = [
  {
    name: "Home Page",
    path: "/",
    icon: <HomeOutlined style={{ fontSize: "20px" }} />,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: <PicRightOutlined style={{ fontSize: "20px" }} />,
  },
];

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null && Router.pathname !== "/") {
      Router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log(JSON.parse(localStorage.getItem("user")));
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);
  return (
    <>
      <Head>
        <title>
          {!isLoading ? (user ? "Home Page" : "Login Page") : "Loading"}
        </title>
      </Head>
      {user && user.token === "123456" && (
        <header>
          <Menu
            mode="horizontal"
            style={{ justifyContent: "center", paddingTop: "1em" }}
          >
            {MenuList.map((data) => (
              <Menu.Item
                onClick={() => {
                  Router.push(data.path);
                }}
                style={
                  isMobile ? {} : { display: "flex", alignItems: "center" }
                }
                key={data.name}
                icon={data.icon}
              >
                {!isMobile && data.name}
              </Menu.Item>
            ))}
            <Menu.Item
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload("/");
              }}
              style={isMobile ? {} : { display: "flex", alignItems: "center" }}
              key="Logout"
              icon={<LogoutOutlined />}
            >
              {!isMobile && "Logout"}
            </Menu.Item>
          </Menu>
        </header>
      )}
      {user && user.token === "123456" ? (
        <Component {...pageProps} />
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
