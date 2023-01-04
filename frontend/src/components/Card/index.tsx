import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ user }: any) {
  return (
    <Card sx={{ maxWidth: 220, maxHeight: 270 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={user.picture.large}
          alt={user.fullName}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {user.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.username}
            <br />
            {user.email}
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
