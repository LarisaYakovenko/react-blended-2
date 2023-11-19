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
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: false,
    error: '',
    isLoadMore: false,
    isLoading: false,
    url: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      ImageService.getImages(query, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...photos],
            isLoadMore: page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  loadMore = () => {
    this.setState(prevState => ({ page: (prevState.page += 1) }));
  };
  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({ query, images: [], page: 1, isEmpty: false });
  };
  openModal = url => {
    this.setState({ url });
  };
  render() {
    const { images, isEmpty, error, isLoadMore, isLoading, url } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        <SearchForm onSubmit={this.handleSubmit} />
        <ImageList images={images} openModal={this.openModal} />
        {url && <Modal closeModal={this.openModal} url={url} />}
        {isLoadMore && <Button onClick={this.loadMore}>Load more</Button>}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      </>
    );
  }
}
