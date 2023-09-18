import logo from "../../assets/navbar_img.png";
import "./navbar.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { BiSolidPhoneCall } from "react-icons/bi";
import Container from "@mui/material/Container";
import TemporaryDrawer from "../drawer/drewer";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      style={{
        background: "rgba(255, 255, 255, 0.80)",
        backdropFilter: "blur(5px)",
        boxShadow: "none",
        borderRadius: "50px",
        padding: "20px 40px",
        margin: "20px auto",
        // width: "90vw",
        height: "93px",
      }}
      className="appbar"
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "53px",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <Link to={"/"} style={{ display: "flex" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "4rem", height: "100%", borderRadius: "50%" }}
            />
            <div className="navbarMain">
              <span>Oltinsoy </span>
              <span>Axborot-kutubxona markazi</span>
            </div>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              margin: "0",
              justifyContent: "flex-end",
            }}
            // style={}
          >
            <TemporaryDrawer />
            {/* <LinkiOutlineMenu /> */}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Box>
              <Link
                className="text-neutral-950 active:text-blue-500 flex flex-row"
                to="tel:+998909107504"
              >
                <BiSolidPhoneCall
                  className="text-3xl text-black"
                  style={{ marginRight: "0.5rem" }}
                />
                +998 71 230-00-50
              </Link>
            </Box>

            <Box style={{ display: "flex" }}>
              <Link
                className="text-neutral-950 bg-lime-500 "
                style={{
                  borderRadius: "1rem",
                  padding: "1rem 2rem 1rem 2rem",
                  alignItems: "center",
                }}
                to={"/contact"}
              >
                Boglanish
              </Link>
            </Box>

            <p className="divider">|</p>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // gap: "2rem",
              }}
            >
              <Link
                className="text-neutral-950 active:text-green-300 flex flex-row"
                target="_blank"
                to="https://www.youtube.com/@oltinsoytumanaxborot-kutub9749"
              >
                {" "}
                <BsYoutube
                  className="text-3xl"
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              </Link>
              <Link
                className="text-neutral-950 active:text-green-300 flex flex-row"
                target="_blank"
                to="https://www.facebook.com/oltinsoytuman.axborotkutubxonamarkazi"
              >
                <FaFacebook
                  className="text-3xl text-blue-600"
                  style={{ marginRight: "0.5rem" }}
                />
              </Link>
              <Link
                className="text-neutral-950 active:text-green-300 flex flex-row"
                target="_blank"
                to="https://instagram.com/oltinsoy_akm"
              >
                <AiFillInstagram
                  className="text-3xl text-red-500"
                  style={{ marginRight: "0.5rem", color: "" }}
                />
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
