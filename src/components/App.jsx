import { Component } from 'react';
import css from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import { requestImage } from 'service/request';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalPage: 1,
    error: '',
    isLoadMore: false,
  };
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      requestImage(this.state).then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalPage: totalHits,
          isLoadMore: page < Math.ceil(totalHits / 12),
        }));
      });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: (prevState.page += 1) }));
  };
  render() {
    const { images,isLoadMore } = this.state;
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {isLoadMore&&<Button onClick={this.loadMore} />}
      </>
    );
  }
}

export default App;
