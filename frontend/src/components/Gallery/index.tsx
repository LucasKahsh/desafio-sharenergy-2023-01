import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Gallery({ itemData }: any) {
  return (
    <>
      <ImageList sx={{ width: 200, height: 200 }} cols={3} rowHeight={164}>
        {itemData.map((item: any) => {
          const fileExt = item.split(".").pop();
          if (fileExt === "mp4" || fileExt === "webm")
            return (
              <ImageListItem key={item}>
                <video
                  id="dog-img"
                  autoPlay
                  loop
                  muted
                  height="100%"
                  width="100%"
                >
                  <source
                    src={`https://random.dog/${item}?w=164&h=164&fit=crop&auto=format`}
                    type="video/mp4"
                  />
                </video>
              </ImageListItem>
            );
          return (
            <ImageListItem key={item}>
              <img
                src={`https://random.dog/${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`https://random.dog/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="aDog"
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
}
