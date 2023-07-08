import React, { Component } from 'react';
import {
  StyledButton,
  StyledForm,
  StyledHeader,
  StyledInput,
  StyledLabel,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = { value: '' };

  onChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <StyledHeader>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledButton type="submit">
            <StyledLabel></StyledLabel>
          </StyledButton>

          <StyledInput
            onChange={this.onChange}
            type="text"
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

export default Searchbar;
