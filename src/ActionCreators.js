import { ACTION_TYPES } from "./store";
import uuid from "react-uuid";

const addContact = (name, email, phone) => {
  return {
    type: ACTION_TYPES.CONTACTS.ADD_CONTACT,
    contact: {
      name,
      email,
      phone,
      id: uuid(),
      isBlocked: false,
    },
  };
};

const deleteContact = (id) => {
  return {
    type: ACTION_TYPES.CONTACTS.DELETE_CONTACT,
    contact: {
      id,
    },
  };
};

const toggleBlockContact = (id) => {
  return {
    type: ACTION_TYPES.CONTACTS.TOGGLE_BLOCK_CONTACT,
    contact: {
      id,
    },
  };
};

const setVisibleContacts = (filter) => {
  return {
    type: ACTION_TYPES.VISIBILITY.SET_VISIBLE_CONTACTS,
    filter,
  };
};

export { addContact, deleteContact, toggleBlockContact, setVisibleContacts };
