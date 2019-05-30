/** @jsx jsx */
import { FC, useState, FormEvent } from 'react';
import { jsx, css } from '@emotion/core';
import { Card, Image, Button, Checkbox } from 'semantic-ui-react';

import Spinner from 'components/common/Spinner';
import Layout from '../common/Layout';
import { User } from '../../reducers/github';

export interface MembersProps {
  organizationName: string;
  users: User[];
  isLoading?: boolean;
  handleAddButton: (checkedUesrs: string[]) => void;
}

const container = css`
  margin-top: 30px !important;
`;

const Members: FC<MembersProps> = ({
  organizationName = '???',
  users = [],
  isLoading = false,
  handleAddButton,
}) => {
  const initialState: string[] = [];
  const [checkedUesrs, checkUser] = useState(initialState);

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      checkUser(checkedUesrs.concat(target.name));
    } else {
      checkUser(checkedUesrs.filter(user => user !== target.name));
    }
  };

  return (
    <Layout>
      {users.length > 0 && (
        <Button color="teal" onClick={() => handleAddButton(checkedUesrs)}>
          チェックしたメンバーを追加
        </Button>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Card.Group css={container}>
            {users.map(user => (
              <Card key={user.id}>
                <Card.Content>
                  <Image floated="right" size="mini" src={user.avatarUrl} />
                  <Card.Header>{user.login}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Checkbox
                    name={user.login}
                    id={user.id}
                    value={user.login}
                    label={user.login}
                    onChange={handleChange}
                  />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      )}
    </Layout>
  );
};

export default Members;
