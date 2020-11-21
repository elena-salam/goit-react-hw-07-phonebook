import React, { Component } from 'react';
import {connect} from 'react-redux';
import contactsOperations from '../../redux/contacts/contactsOperations';
import styles from './ContactForm.module.css';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func,
    contacts: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const {name, number} = this.state;
    const {contacts} = this.props;

    const isIncludeContact = contacts.some(contact => contact.name === name);

    if(isIncludeContact){
      this.props.openModal();
      return;
    }

    this.props.onAddContact({name, number});

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
          className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button className={styles.button} type="submit">Add contact</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContacts(state),
});

const mapDispatchToProps = {
  onAddContact: contactsOperations.addContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);