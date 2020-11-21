import React from 'react';
import { connect } from 'react-redux';
import styles from './ContactListItem.module.css';
import contactsOperations from '../../redux/contacts/contactsOperations';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import PropTypes from 'prop-types';

function ContactListItem({ name, number, onRemove }) {
  return (
    <li className={styles.item}>
      <span className={styles.span}>
        {name}: {number}
      </span>
      <button className={styles.button} type="button" onClick={onRemove}>
        X
      </button>
    </li>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...contactsSelectors.getContact(state, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemove: () => dispatch(contactsOperations.removeContact(ownProps.id)),
});

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onRemove: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);