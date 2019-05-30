/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { User } from '../../reducers/github';

export interface RandomUsersProps {
  users: User[];
  dispatchRemoveMember: (userLogin: string) => void;
}

const RandomUsers: FC<RandomUsersProps> = ({ users, dispatchRemoveMember }) => (
  <Card.Group>
    {users.map(user => (
      <Card key={user.id}>
        <Card.Content>
          <Image floated="right" size="mini" src={user.avatarUrl} />
          <Card.Header>{user.login}</Card.Header>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Button color="red" onClick={() => dispatchRemoveMember(user.login)}>
            <Icon name="trash" />
            削除
          </Button>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

export default RandomUsers;
