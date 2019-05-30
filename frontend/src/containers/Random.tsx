import React, { FC, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { User } from 'src/reducers/github';
import Random from 'src/components/Random';
import { RootStateType } from 'src/reducers';
import { start, stop, clearApointUser } from 'src/actions/random';

interface StateProps {
  isActive: boolean;
  apointUser: User | null;
  users: User[];
}

interface DispatchProps {
  startRandom: () => void;
  stopRandom: (user: User) => void;
  clearRandom: () => void;
}

type EnhancedRandomProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  isActive: state.random.isActive,
  apointUser: state.random.apointUser,
  users: state.random.users,
});

const mapDispathToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      startRandom: () => start(),
      stopRandom: (user: User) => stop({ user }),
      clearRandom: () => clearApointUser(),
    },
    dispatch,
  );

const useRandomUser = (users: User[]): [User, () => void] => {
  const initialUser = users[0];
  const [activeUser, switchActiveUser] = useState(initialUser);

  const updateActiveUser = () => {
    switchActiveUser(users[Math.floor(Math.random() * users.length)]);
  };

  return [activeUser, updateActiveUser];
};

const RandomContainer: FC<EnhancedRandomProps> = ({
  isActive,
  apointUser,
  users,
  startRandom,
  stopRandom,
  clearRandom,
}) => {
  const [activeUser, updateActiveUser] = useRandomUser(users);
  const [intervalId, updateIntervalId] = useState<NodeJS.Timer | null>(null);

  const handleStartButton = () => {
    const id: NodeJS.Timer = setInterval(() => {
      updateActiveUser();
    }, 10);
    updateIntervalId(id);
    startRandom();
  };

  /* 参考:https://blog.kubosho.com/entry/setinterval-trap-on-typescript/ */
  const handleStopButton = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    updateIntervalId(null);
    stopRandom(activeUser);
  };

  useEffect(() => {
    return () => clearRandom();
  }, []);

  return (
    <Random
      {...{
        isActive,
        apointUser,
        users,
        handleStartButton,
        handleStopButton,
        activeUser,
      }}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(RandomContainer);
