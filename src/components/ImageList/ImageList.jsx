import { Grid, GridItem, CardItem } from 'components';
import React from 'react';

export const ImageList = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(image => (
        <GridItem key={image.id}>
          <CardItem color={image.avg_color}>
            <img
              onClick={() => openModal(image.src.large)}
              src={image.src.large}
              alt={image.alt}
            />
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
