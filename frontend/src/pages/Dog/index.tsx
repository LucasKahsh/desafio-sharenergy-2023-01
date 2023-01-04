import { IconButton } from "@mui/material";
import React, { useState } from "react";
import api from "../../api/api";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import useAuth from "../../hooks/useAuth";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Container } from "@mui/system";
import Gallery from "../../components/Gallery";
import Grid from "@mui/material/Grid";

const Dog = () => {
  const { user }: any = useAuth();
  const [src, setSrc] = useState();
  const [mp4, setMp4] = useState();
  const [gallery, setGallery] = useState<any>([]);
  const [galleryMovie, setGalleryMovie] = useState<any>([]);

  const clickHandler = async () => {
    const sla: any = await api.get(`dog`, {
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
      },
    });
    const result = sla.data.src;
    const fileExt = result.split(".").pop();
    if (fileExt === "mp4" || fileExt === "webm") {
      setSrc(undefined);
      setMp4(result);
      setGalleryMovie([...galleryMovie, result]);
      return;
    }
    setGallery([...gallery, result]);
    setMp4(undefined);
    setSrc(result);
  };

  return (
    <>
      {ResponsiveAppBar()}
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid item>
            <h1>
              Clique aqui:{" "}
              <IconButton onClick={() => clickHandler()}>
                <RefreshIcon fontSize="large" />
              </IconButton>
            </h1>
          </Grid>
          <Grid item>
            {(gallery.length > 0 || galleryMovie.length > 0) && (
              <Gallery itemData={[...gallery, ...galleryMovie]}></Gallery>
            )}
          </Grid>
        </Grid>
        <Container sx={{ margin: 6 }}>
          {src ? (
            <img
              src={`https://random.dog/${src}`}
              height="80%"
              width="80%"
              alt="a dog"
            />
          ) : null}
          {mp4 ? (
            <video id="dog-img" autoPlay loop muted height="80%" width="80%">
              <source src={`https://random.dog/${mp4}`} type="video/mp4" />
            </video>
          ) : null}
        </Container>
      </Container>
    </>
  );
};

export default Dog;
