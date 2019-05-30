/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import Layout from './common/Layout';
import pages from '../pages';

const Home: FC = () => (
  <Layout>
    {/* <GithubInput /> */}
    <List celled relaxed>
      <List.Item className="list-item">
        <List.Icon
          name="building outline"
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <Link to={pages.organizations.path}>{pages.organizations.title}</Link>
        </List.Content>
      </List.Item>
      <List.Item className="list-item">
        <List.Icon name="users" size="large" verticalAlign="middle" />
        <List.Content>
          <Link to={pages.users.path}>{pages.users.title}</Link>
        </List.Content>
      </List.Item>
    </List>
  </Layout>
);

export default Home;
