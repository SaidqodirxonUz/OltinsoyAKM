import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/navbar_img.png";

import {
  TbBrandInstagram,
  TbBrandTelegram,
  TbBrandYoutube,
} from "react-icons/tb";

import { Link } from "react-router-dom";

// const Navbar = () => {

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const pages = [
    { name: "Bosh Sahifa", url: "/" },
    { name: "Kontaktlar", url: "/contact" },
    // { name: "navbar_adventages_link", url: "/advantages" },
    // { name: "navbar_catalog_link", url: "/catalog" },
    // { name: "navbar_news_link", url: "/news" },
    // { name: "navbar_contact_link", url: "/contact" },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 280,
        height: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="menubar"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <img
          src={logo}
          alt="Kalde"
          className="ml-6 py-2"
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            // marginTop: "10rem",
          }}
        />
        <List>
          {pages.map((el) => (
            <ListItem
              key={el.name}
              disablePadding
              className="px-6 text-white active:text-orange-500 active:border-b-2 active:border-solid active:border-orange-500"
            >
              <Link to={el.url}>
                <ListItemText primary={el.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap: "2rem",
          // alignItems: "center",
          padding: "1rem ",
          color: "white",

          // alignSelf: "center",
        }}
        className="s_links"
      >
        <article
          className="social_btn btn bg-orange-500 p-3 "
          style={{
            borderRadius: "8px",
          }}
        >
          <Link
            target="_blank"
            to="https://www.youtube.com/@oltinsoytumanaxborot-kutub9749"
          >
            <TbBrandTelegram />
          </Link>
        </article>
        <article
          className="social_btn btn bg-orange-500 p-3"
          style={{
            borderRadius: "8px",
          }}
        >
          <Link target="_blank" to="https://instagram.com/oltinsoy_akm">
            <TbBrandInstagram />
          </Link>
        </article>
        <article
          className="social_btn btn bg-orange-500 p-3 "
          style={{
            borderRadius: "8px",
          }}
        >
          <Link
            target="_blank"
            to="https://www.facebook.com/oltinsoytuman.axborotkutubxonamarkazi"
          >
            <TbBrandYoutube />
          </Link>
        </article>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <AiOutlineMenu className="text-black text-2xl" />
          </Button>
          <Drawer
            style={{ background: "rgba(0,0,0,0.2)" }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {console.log(anchor)}
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
