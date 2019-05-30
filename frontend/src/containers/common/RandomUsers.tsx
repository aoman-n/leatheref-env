import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { removeMember } from '../../actions/random';
import { clear } from '../../actions/github';
import { RootStateType } from '../../reducers';
import { User } from '../../reducers/github';
import RandomUsers from '../../components/common/RandomUsers';

interface StateProps {
  users: User[];
}

interface DispatchProps {
  dispatchRemoveMember: (userLogin: string) => void;
  clearGithubStore: () => void;
}

type EnhancedRandomUsersProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  users: state.random.users,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      dispatchRemoveMember: (userLogin: string) => removeMember({ userLogin }),
      clearGithubStore: () => clear(),
    },
    dispatch,
  );

const RandomUsersContainer: FC<EnhancedRandomUsersProps> = ({
  users,
  dispatchRemoveMember,
  clearGithubStore,
}) => {
  useEffect(() => {
    return () => {
      clearGithubStore();
    };
  }, []);

  return <RandomUsers {...{ users, dispatchRemoveMember, clearGithubStore }} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RandomUsersContainer);
