import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm.js';
import ContactsList from '../ContactList/ContactList.js';
import Notification from '../Notification/Notification.js';
import Loader from '../Loader/Loader';

import { CSSTransition } from 'react-transition-group';
import styles from './App.module.css';
import transitionTitle from './transitionTitle.module.css';
import NotificationTransition from '../Notification/NotificationTransition.module.css';
import ContactsSectionTransition from '../ContactList/ContactsSectionTransition.module.css';
import LoaderTransition from '../Loader/LoaderTransition.module.css';
import contactsOperations from '../../redux/contacts/contactsOperations';
import contactsSelectors from '../../redux/contacts/contactsSelectors';

class App extends Component {
  state = {
    isOpenModal: false,
  };

  componentDidMount() {
    this.props.onFetchContacts();
  }

  handleOpenModal = () => {
    this.setState({ isOpenModal: true });
    setTimeout(() => {
      this.setState({ isOpenModal: false });
    }, 1500);
  };

  render() {
    const { isOpenModal } = this.state;
    const { contacts, isLoadingContacts } = this.props;

    return (
      <Layout>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={transitionTitle}
        >
          <h2 className={styles.logo}>Phonebook</h2>
        </CSSTransition>

        <section className={styles.section}>
          <ContactForm openModal={this.handleOpenModal} />
        </section>

        <h2 className={styles.title}>Contacts</h2>

        
        <CSSTransition
          in={contacts.length > 0}
          appear={true}
          timeout={250}
          classNames={ContactsSectionTransition}
          unmountOnExit
        >
          <section className={styles.section}>
            <Filter />
            <ContactsList />
          </section>
        </CSSTransition>

        <CSSTransition
            in={contacts.length < 1}
            appear={true}
            timeout={250}
            classNames={ContactsSectionTransition}
            unmountOnExit
          >
            <h2>Your phonebook is empty.</h2>
          </CSSTransition>

        <CSSTransition
          in={isLoadingContacts}
          appear={true}
          classNames={LoaderTransition}
          timeout={150}
          unmountOnExit
        >
          <Loader />
        </CSSTransition>
        <CSSTransition
          in={isOpenModal}
          appear={true}
          classNames={NotificationTransition}
          timeout={250}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContacts(state),
  isLoadingContacts: contactsSelectors.getIsLoadingContacts(state),
});

const mapDispatchToProps = {
  onFetchContacts: contactsOperations.fetchContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);