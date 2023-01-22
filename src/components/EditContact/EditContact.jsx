import { useState } from 'react';
import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { hideForm } from 'redux/edit/editSlice';
import { useEffect } from 'react';
import { selectEdit } from 'redux/edit/editSelectors';
import { addContact, deleteContact } from 'redux/contacts/contactsOperations';

export const EditContact = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const editedContact = useSelector(selectEdit);

  useEffect(() => {
    setName(editedContact.name);
    setNumber(editedContact.number);
  }, [editedContact]);

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const submitHandler = event => {
    event.preventDefault();

    if (
      contacts.find(contact => contact.name === name) &&
      editedContact.name !== name
    ) {
      return alert(`${name} is already in contacts!`);
    }

    const { id } = editedContact;

    dispatch(hideForm());
    dispatch(deleteContact(id));
    dispatch(addContact({ ...editedContact, name, number }));

    event.target.reset();
  };

  const inputHandler = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>
          <input
            onInput={inputHandler}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan!"
            required
          />
          <b>→ name</b>
        </label>
        <label>
          <input
            onInput={inputHandler}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +!"
            required
          />
          <b>→ number</b>
        </label>
      </div>
      <button type="submit">Save edits</button>
      <button type="button" onClick={() => dispatch(hideForm())}>
        Close
      </button>
    </form>
  );
};
