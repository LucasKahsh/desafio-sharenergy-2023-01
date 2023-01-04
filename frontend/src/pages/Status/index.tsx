import React, { useState } from "react";
import api from "../../api/api";
import { Buffer } from "buffer";
import useAuth from "../../hooks/useAuth";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import { Button, Container, Grid, TextField } from "@mui/material";
import { Icon } from "@iconify/react";

const Status = () => {
  const { user }: any = useAuth();
  const [status, setStatus] = useState(404);
  const [photo, setPhoto] = useState();

  const clickHandler = async (status: number) => {
    setStatus(status);
    let sla: any = await api.get(`status/${status}`, {
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
      },
      responseType: "arraybuffer",
    });
    sla = Buffer.from(sla.data, "binary").toString("base64");
    setPhoto(sla);
  };

  return (
    <>
      {ResponsiveAppBar()}
      <Container sx={{ p: 5 }} maxWidth="sm">
        <h1>Digite um status code:</h1>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              inputProps={{ type: "number" }}
              onChange={(e) => setStatus(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              size="large"
              onClick={() => clickHandler(status)}
            >
              PROCURAR GATINHO{" "}
              <Icon icon="mdi:cat" style={{ fontSize: "50px" }} />
            </Button>
          </Grid>
        </Grid>
        <Container sx={{ marginTop: 6 }}>
          {photo ? (
            <img
              src={`data:image/png;base64,${photo}`}
              alt="cat"
              height="90%"
              width="90%"
            />
          ) : null}
        </Container>
      </Container>
    </>
  );
};

export default Status;
