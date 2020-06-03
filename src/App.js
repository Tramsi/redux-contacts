import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  deleteContact,
  toggleBlockContact,
  setVisibleContacts,
} from "./ActionCreators";
import { ACTION_TYPES } from "./store";

function App() {
  const contacts = useSelector((store) => store.contacts);
  const visibility = useSelector((store) => store.visibleContacts);
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const contactsTitle = (visibility) => {
    if (visibility === ACTION_TYPES.VISIBILITY.SHOW_BLOCKED) {
      return "Blocked Contacts";
    } else if (visibility === ACTION_TYPES.VISIBILITY.SHOW_UNBLOCKED) {
      return "Unblocked Contacts";
    }
    return "All Contacts";
  };

  const visibilityActivity = (stateVisiblitly, actionVisiblity) => {
    return stateVisiblitly === actionVisiblity ? "visibility__p--active" : "";
  };

  return (
    <div className="app container">
      <h1>Phonebook</h1>
      <div id="states"></div>
      <h3>{contactsTitle(visibility)}</h3>
      <ul id="contacts">
        <Contacts contacts={contacts} visibility={visibility} />
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addContact(nameInput, emailInput, phoneInput));
          setEmailInput("");
          setNameInput("");
          setPhoneInput("");
        }}
      >
        <div className="inputs">
          <label className="addName">
            <p>Name:</p>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(event) => {
                setNameInput(event.target.value);
              }}
            />
            <p className="validation valid">*Required</p>
          </label>
          <label className="addEmail">
            <p>Email:</p>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
            />
            <p className="validation valid">*Required</p>
          </label>
          <label className="addPhone">
            <p>Phone Number:</p>
            <input
              type="number"
              required
              min="1"
              value={phoneInput}
              onChange={(event) => {
                setPhoneInput(event.target.value);
              }}
            />
            <p className="validation valid">*Required</p>
          </label>
        </div>
        <div className="buttons">
          <button className="add-btn" type="submit">
            Add contact
          </button>
        </div>
      </form>
      <div className="visibility">
        <p
          className={`show-all ${visibilityActivity(
            visibility,
            ACTION_TYPES.VISIBILITY.SHOW_ALL
          )} `}
          onClick={() => {
            dispatch(setVisibleContacts(ACTION_TYPES.VISIBILITY.SHOW_ALL));
          }}
        >
          Show All
        </p>
        <p
          className={`show-blocked ${visibilityActivity(
            visibility,
            ACTION_TYPES.VISIBILITY.SHOW_BLOCKED
          )} `}
          onClick={() => {
            dispatch(setVisibleContacts(ACTION_TYPES.VISIBILITY.SHOW_BLOCKED));
          }}
        >
          Show Blocked
        </p>
        <p
          className={`show-unblocked ${visibilityActivity(
            visibility,
            ACTION_TYPES.VISIBILITY.SHOW_UNBLOCKED
          )} `}
          onClick={() => {
            dispatch(
              setVisibleContacts(ACTION_TYPES.VISIBILITY.SHOW_UNBLOCKED)
            );
          }}
        >
          Show Unblocked
        </p>
      </div>
    </div>
  );
}

const Contacts = ({ contacts, visibility }) => {
  let contactsNew = [...contacts];
  if (visibility === ACTION_TYPES.VISIBILITY.SHOW_BLOCKED) {
    contactsNew = contactsNew.filter((contact) => contact.isBlocked);
  } else if (visibility === ACTION_TYPES.VISIBILITY.SHOW_UNBLOCKED) {
    contactsNew = contactsNew.filter((contact) => !contact.isBlocked);
  }
  const dispatch = useDispatch();
  return (
    <>
      {contactsNew.map((contact, index) => {
        const { name, email, phone, isBlocked, id } = contact;
        return (
          <li key={id}>
            {index + 1} -<span className="bold">Name: </span>
            {name} <span className="bold">Email: </span>
            {email} <span className="bold">Phone: </span>
            {phone}
            <button
              className="delete-btn"
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            >
              Delete
            </button>
            <button
              className="block-btn"
              onClick={() => {
                dispatch(toggleBlockContact(id));
              }}
            >
              {isBlocked ? "Unblock" : "block"}
            </button>
          </li>
        );
      })}
    </>
  );
};

export default App;
