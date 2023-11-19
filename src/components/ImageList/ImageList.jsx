import { Grid, GridItem, CardItem } from 'components';
import React from 'react';

export const ImageList = ({ images }) => {
  return (
    <Grid>
      {images.map(image => (
        <GridItem key={image.id}>
          <CardItem color={image.avg_color}>
            <img src={image.src.large} alt={image.alt} />
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
