/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Button, List } from 'semantic-ui-react';

import RandomUsers from '../../containers/common/RandomUsers';
import Layout from '../common/Layout';
import pages from '../../pages';

const Confirmation: FC = () => (
  <Layout>
    <h3>追加したメンバー:</h3>
    <RandomUsers />
    <List>
      <List.Header>もっとメンバーを追加</List.Header>
      <List.Item>
        <Link to={pages.organizations.path}>会社から検索</Link>
      </List.Item>
      <List.Item>
        <Link to={pages.users.path}>ユーザーIDから検索</Link>
      </List.Item>
    </List>
    <Link to="/random">
      <Button color="blue">ランダムを開始する</Button>
    </Link>
  </Layout>
);

export default Confirmation;
