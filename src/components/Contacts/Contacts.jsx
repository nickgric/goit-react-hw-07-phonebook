import Avatar from 'react-avatar';
import { RotatingTriangles } from 'react-loader-spinner';

import { deleteContact } from 'redux/contacts/contactsOperations';
import {
  selectContacts,
  selectLoading,
} from 'redux/contacts/contactsSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchContacts } from 'redux/contacts/contactsOperations';
import { selectFilter } from 'redux/filter/filterSelectors';
import { showForm, editContact } from 'redux/edit/editSlice';

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteHandler = ({ target: { name } }) => {
    const id = name;
    dispatch(deleteContact(id));
  };

  const editHandler = ({ target: { name } }) => {
    const id = name;
    const contact = contacts.find(contact => contact.id === id);
    dispatch(editContact(contact));
    dispatch(showForm());
  };

  return (
    <>
      <ul>
        {filteredContacts()
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(contact => (
            <li key={contact.id}>
              <Avatar
                name={contact.name}
                maxInitials={2}
                size={30}
                round={true}
              />
              <p>
                <b>
                  {contact.name.length < 35
                    ? contact.name
                    : contact.name.substr(0, 35) + '...'}
                  :
                </b>{' '}
                {contact.number}
              </p>
              <div>
                <button name={contact.id} onClick={editHandler}>
                  Edit
                </button>
                <button name={contact.id} onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      {contacts.length > 0 && (
        <p>
          Sorted by <b>name</b>
        </p>
      )}
      {loading && (
        <RotatingTriangles
          height={60}
          colors={['#a52a2a', '#EF8354', '#DB5461']}
        />
      )}
    </>
  );
};
