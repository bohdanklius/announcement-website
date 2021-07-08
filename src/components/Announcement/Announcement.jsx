import PropTypes from 'prop-types';
import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'
import { removeAnnouncementAPI } from '../../api';
import './Announcement.scss';

export const Announcement = ({
  id,
  date,
  announcementDescription,
  announcementTitle,
  handleEdit,
  handleRemove,
}) => (
  <Card style={{width: '90vw', margin: '20px'}}>
    <Card.Content description={announcementTitle} />
    <Card.Content description={announcementDescription} />
    <Card.Content extra >
      <Icon name='calendar alternate outline' />
      {date}
    </Card.Content>
    <div className="container">
      <Button
        basic
        color="grey"
        content="Edit"
        onClick={() => handleEdit(id)}
      />
      <Button
        basic
        color="red"
        content="Delete"
        onClick={() => {
          handleRemove(id);
          removeAnnouncementAPI(id);
        }}
      />
    </div>
  </Card>
)

Announcement.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  announcementTitle: PropTypes.string.isRequired,
  announcementDescription: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};