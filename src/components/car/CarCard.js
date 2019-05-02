import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const CarCard = ({ className, name, vin }) => {
  return (
    <div className={className}>
      <Card className="card">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">{vin}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary">
            Dodaj Naprawę
          </Button>
          <Button size="small" color="secondary">
            Dodaj Ulepszenie
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export const StyledCarCard = styled(CarCard)`
  .media {
    height:145px;
  }
`;
