import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import fetchImagesOnQuery from '../../service/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import styles from './App.module.scss';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
  };

  componentDidMount() {}

  async componentDidUpdate(pP, pS) {
    const { query, page } = this.state;
    const response = await fetchImagesOnQuery(query, page);
    console.log('response', response);
    if (pS.query !== query)
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...response],
      }));
  }
  // this.setState((prevState) => ({ todos: [...prevState.todos, todo] }));

  handleFormSubmit = query => {
    this.setState({ query });
  };
  render() {
    const { pictures } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={pictures} />
      </div>
    );
  }
}
