/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Button, Card, Image } from 'semantic-ui-react';

import { User } from 'src/reducers/github';
import Layout from 'src/components/common/Layout';

interface RandomProps {
  isActive: boolean;
  apointUser: User | null;
  users: User[];
  activeUser: User;
  handleStartButton: () => void;
  handleStopButton: () => void;
}

const Random: FC<RandomProps> = ({
  users,
  isActive,
  apointUser,
  activeUser,
  handleStartButton,
  handleStopButton,
}) => {
  return (
    <Layout>
      <h3>ボタンを押してスタートしてください。</h3>
      {isActive ? (
        <Button color="red" onClick={handleStopButton}>
          stop
        </Button>
      ) : (
        <Button color="teal" onClick={handleStartButton}>
          start
        </Button>
      )}
      {isActive && (
        <Card key={activeUser.id}>
          <Card.Content>
            <Image floated="right" size="mini" src={activeUser.avatarUrl} />
            <Card.Header>{activeUser.login}</Card.Header>
          </Card.Content>
        </Card>
      )}
      {apointUser && (
        <div>
          <Card key={apointUser.id}>
            <Card.Content>
              <Image floated="right" size="mini" src={apointUser.avatarUrl} />
              <Card.Header>{apointUser.login}</Card.Header>
            </Card.Content>
          </Card>
          <p>選ばれし者！</p>
        </div>
      )}
    </Layout>
  );
};

export default Random;
