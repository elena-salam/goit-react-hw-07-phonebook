import React from 'react';
import ContactListItem from '../ContactListItem/ContactListItem.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import itemTransition from './itemTransition.module.css';
import { connect } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import PropTypes from 'prop-types';

function ContactsList({ contacts }) {
  return (
    <TransitionGroup component="ul">
      {contacts.map(({ id }) => (
        <CSSTransition key={id} classNames={itemTransition} timeout={250}>
          <ContactListItem id={id} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getFiltredContacts(state),
});

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
}

export default connect(mapStateToProps)(ContactsList);