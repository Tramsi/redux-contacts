import { createStore } from "redux";

export const ACTION_TYPES = {
  VISIBILITY: {
    SHOW_ALL: "SHOW_ALL",
    SHOW_BLOCKED: "SHOW_BLOCKED",
    SHOW_UNBLOCKED: "SHOW_UNBLOCKED",
    SET_VISIBLE_CONTACTS: "SET_VISIBLE_CONTACTS",
  },
  CONTACTS: {
    ADD_CONTACT: "ADD_CONTACT",
    DELETE_CONTACT: "DELETE_CONTACT",
    TOGGLE_BLOCK_CONTACT: "TOGGLE_BLOCK_CONTACT",
  },
};

const initialState = {
  visibleContacts: ACTION_TYPES.VISIBILITY.SHOW_ALL,
  contacts: [],
};

//Reducer
const states = [];
const contactApp = (state = initialState, action) => {
  let newState = initialState;
  switch (action.type) {
    case ACTION_TYPES.CONTACTS.ADD_CONTACT:
      newState = { ...state, contacts: [...state.contacts, action.contact] };
      break;
    case ACTION_TYPES.CONTACTS.DELETE_CONTACT:
      const contacts = state.contacts.filter(
        (contact) => contact.id !== action.contact.id
      );
      newState = {
        ...state,
        contacts,
      };
      break;
    case ACTION_TYPES.CONTACTS.TOGGLE_BLOCK_CONTACT:
      newState = {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.contact.id) {
            return { ...contact, isBlocked: !contact.isBlocked };
          }
          return contact;
        }),
      };
      break;
    case ACTION_TYPES.VISIBILITY.SET_VISIBLE_CONTACTS:
      newState = { ...state, visibleContacts: action.filter };
      break;
    default:
      break;
  }
  states.push(newState);
  return newState;
};

//create store
const store = createStore(
  contactApp /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
