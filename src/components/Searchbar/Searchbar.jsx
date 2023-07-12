import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

import {
  StyledButton,
  StyledForm,
  StyledHeader,
  StyledInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = { value: '' };

  onChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  onSubmit = e => {
    const { value } = this.state;
    e.preventDefault();

    this.props.handleSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <StyledHeader>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledButton type="submit">
            {/* <StyledLabel> */}
            <BsSearch />
            {/* </StyledLabel> */}
          </StyledButton>

          <StyledInput
            onChange={this.onChange}
            type="text"
            placeholder="Search images and photos"
            value={value}
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

export default Searchbar;
