import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: { name: '', number: '', id: '' },
  form: false,
};

const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    editContact: (state, { payload }) => {
      state.item = payload;
    },
    showForm: state => {
      state.form = true;
    },
    hideForm: state => {
      state.form = false;
    },
  },
});

export const { editContact, showForm, hideForm } = editSlice.actions;
export const editReducer = editSlice.reducer;
