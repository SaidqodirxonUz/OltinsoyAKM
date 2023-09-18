import { Box, Button, Typography } from "@mui/material";
import {
  TbBrandInstagram,
  TbBrandFacebook,
  TbBrandYoutube,
} from "react-icons/tb";
import "./style.scss";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const ContactMe = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  // const LangVal = () => {
  //   return i18n.language;
  // };
  // const Contact = () => {

  return (
    <>
      <div
        className="contact flex flex-row justify-end items-center w-full bg-neutral-100"
        style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
      >
        <div
          className="info w-full"
          style={{
            // display: "flex",
            justifyContent: " center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "2rem",
              padding: "60px 48px",
              height: "300px",
              minWidth: "500px",
              borderTop: "5px solid var(--orange, #186ba3)",
              background: "#FFF",
              width: "30%",
              fontSize: "20px",
              /* small shadow */
              boxShadow: "5px 5px 20px 0px rgba(0, 0, 0, 0.05)",

              // flexShrink: 0,
            }}
          >
            <Typography>
              Qo‘shimcha savollaringiz bormi?
              <br />
              Biz bilan bog‘laning. Va biz har doim siz bilan suhbatlashishga
              tayyormiz!
            </Typography>

            <Typography>
              Yuborilgan sorovlar 24 soat ichida korib chiqiladi .
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              gap: "3rem",
              alignItems: "center",
              padding: "2rem 0",
            }}
            className="s_links"
          >
            <article
              className="social_btn btn bg-white p-2 "
              style={{
                borderRadius: "8px",
              }}
            >
              <Link
                to="https://www.youtube.com/@oltinsoytumanaxborot-kutub9749"
                target="_blank"
                style={{ color: "#324291", fontSize: "24px" }}
              >
                <TbBrandYoutube />
              </Link>
            </article>
            <article
              className="social_btn btn bg-white p-2 "
              style={{
                borderRadius: "8px",
              }}
            >
              <Link
                to="https://instagram.com/oltinsoy_akm"
                target="_blank"
                style={{ color: "#324291", fontSize: "24px" }}
              >
                <TbBrandInstagram />
              </Link>
            </article>
            <article
              className="social_btn btn bg-white p-2 "
              style={{
                borderRadius: "8px",
              }}
            >
              <Link
                to="https://www.facebook.com/oltinsoytuman.axborotkutubxonamarkazi"
                target="_blank"
                style={{ color: "#324291", fontSize: "24px" }}
              >
                <TbBrandFacebook />
              </Link>
            </article>
          </div>
        </div>
        <div className="form_data flex flex-col text-white justify-center align-middle items-center m-auto py-24 ">
          <Typography
            variant="h4"
            component="h2"
            className="font-semibold text-sm"
            style={{ marginTop: "5rem" }}
          >
            Biz bilan bog‘lanish.
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="on"
            className="flex flex-col w-full lg:w-96 justify-center items-end forma"
          >
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Ismingiz"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="text-1542372332072">Ismingiz</label>
            </div>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Telefon Raqam"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <label htmlFor="text-1542372332072">Telefon raqamingiz</label>
              {/* <div className="req-mark">!</div> */}
            </div>
            {/* <TextField id="outlined-basic" label="Familya" variant="outlined" /> */}
            <div className="textarea-group">
              <textarea
                placeholder="Xabaringiz"
                rows="3"
                name="comment[text]"
                id="comment_text"
                cols="10"
                className="ui-autocomplete-input"
                style={{ color: "#fff" }}
                required
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                // autocomplete="off"
                // role="textbox"
                // aria-autocomplete="list"
                // aria-haspopup="true"
              ></textarea>
            </div>
            <Button
              variant="contained"
              className="send_btn"
              style={{
                background: `var(--liniar, linear-gradient(90deg, #052438 0%, #186ba3 100%))`,
              }}
              onClick={(e) => {
                e.preventDefault();

                let data = JSON.stringify({
                  name: name,
                  phone: phone,
                  message: message,
                });

                let config = {
                  method: "post",
                  maxBodyLength: Infinity,
                  url: "/send",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios
                  .request(config)
                  .then((response) => {
                    console.log(JSON.stringify(response));

                    if (response.status == 200) {
                      toast("Xabaringiz Muvafaqiyatli yuborildi ", {
                        type: "success",
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    // alert("Xatolik yuz berdi");
                    if (error.request.status == 400) {
                      toast("Xabaringiz yuborilmadi qayta urinib ko‘ring ", {
                        type: "error",
                      });
                    }
                    if (error.request.status == 403) {
                      toast("Xabar yuborishda xatolik", { type: "info" });
                    }
                  });
              }}
            >
              Jo‘natish
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
