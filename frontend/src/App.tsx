/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Switch, Route } from 'react-router';

import Home from 'components/Home';
import Organizations from 'src/components/Organizations/Index';
import SearchUser from 'src/components/SearchUser';
import Members from 'src/containers/Organizations/Members';
import Confirmation from 'components/Confirmation';
import Random from 'containers/Random';
import Header from 'src/components/common/Header';
import NotFound from 'src/components/common/NotFound';

import pages from './pages';

const App: FC = () => (
  <div>
    <Header title="github randomers" />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path={pages.organizations.path} component={Organizations} />
      <Route path={pages.users.path} component={SearchUser} />
      <Route path="/:organizationName/members" component={Members} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/random" component={Random} />
      <Route path="/" component={NotFound} />
    </Switch>
  </div>
);

export default App;
