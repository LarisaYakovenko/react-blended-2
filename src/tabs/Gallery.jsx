import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  ImageList,
} from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      ImageService.getImages(query, page).then(({ photos, total_results }) => {
        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
        }));
      });
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({ query, images: [], page: 1, isEmpty: false });
  };

  render() {
    const { images, isEmpty } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <ImageList images={images} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
