import { useState } from 'react';

import { Section } from './Section';
import { AddContact } from './AddContact';
import { Filter } from './Filter';
import { Contacts } from './Contacts';
import { EditContact } from './EditContact';

export const App = () => {
  const [form, setForm] = useState(false);

  return (
    <>
      <h1>React-HW07 'Redux Async' @nickgric</h1>
      <Section title="Phonebook">
        <AddContact />
      </Section>
      {form && (
        <Section title="Edit contact">
          <EditContact setForm={setForm} />
        </Section>
      )}
      <Section title="Contacts">
        <Filter />
        <Contacts setForm={setForm} />
      </Section>
    </>
  );
};
