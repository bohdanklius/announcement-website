import PropTypes from 'prop-types';
import React from 'react';
import {
  Form,
  Input
} from 'semantic-ui-react';
import { ANNOUNCEMENT, ANNOUNCEMENTFORM, DASHBOARD } from '../../variables';
import './Header.scss';
const navigation = [
  { id: 1, title: 'Announcement' },
  { id: 2, title: 'Add new announcement' },
];

export const Header = ({ setNavigationActive, setEditedAnnouncement, query, setQuery }) => {

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className="header">
      {navigation.map(({ id, title }) => (
        <button
          onClick={() => {
            if (id === 1) {
              setNavigationActive(DASHBOARD);
            } else {
              setNavigationActive(ANNOUNCEMENTFORM);
            }
            setEditedAnnouncement(ANNOUNCEMENT);
          }}
          className="header__button"
          key={id}
          type="button"
        >
          {title}
        </button>
      ))}
      <Form.Field
        type="text"
        name="search"
        placeholder="Search"
        onChange={handleChange}
        control={Input}
      />
    </div>
  )
}

Header.propTypes = {
  setNavigationActive: PropTypes.func.isRequired,
  setEditedAnnouncement: PropTypes.func.isRequired,
};
