import { Component } from 'react';
import css from './searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = ev => {
    this.setState({ query: ev.target.value });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.handleSubmit(this.state.query);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <CiSearch size={30} />
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            onInput={this.handleInput}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
