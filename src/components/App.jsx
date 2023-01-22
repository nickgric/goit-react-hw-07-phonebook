import { Section } from './Section';
import { AddContact } from './AddContact';
import { Filter } from './Filter';
import { Contacts } from './Contacts';
import { EditContact } from './EditContact';

import { useSelector } from 'react-redux';
import { selectForm } from 'redux/edit/editSelectors';

export const App = () => {
  const form = useSelector(selectForm);
  return (
    <>
      <h1>React-HW07 'Redux Async' @nickgric</h1>
      <Section title="Phonebook">
        <AddContact />
      </Section>
      {form && (
        <Section title="Edit contact">
          <EditContact />
        </Section>
      )}
      <Section title="Contacts">
        <Filter />
        <Contacts />
      </Section>
    </>
  );
};
