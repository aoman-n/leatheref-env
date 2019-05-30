import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { RootStateType } from '../../reducers';
import { User } from '../../reducers/github';
import { addMembers } from '../../actions/random';
import Members from '../../components/Organizations/Members';

interface StateProps {
  users: User[];
  isLoading: boolean;
  organizationName: string;
}

interface DispatchProps {
  dispatchAddMembers: (users: User[]) => void;
}

type EnhancedMembersProps = StateProps & DispatchProps & RouteComponentProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  users: state.github.users,
  isLoading: state.github.isLoading,
  organizationName: state.github.organizationName,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      dispatchAddMembers: (users: User[]) => addMembers({ users }),
    },
    dispatch,
  );

const MembersContainer: FC<EnhancedMembersProps> = ({
  organizationName,
  users,
  isLoading,
  dispatchAddMembers,
  history,
}) => {
  const handleAddButton = (checkedUesrs: string[]) => {
    const addUsers: User[] = users.filter(user =>
      checkedUesrs.includes(user.login),
    );
    dispatchAddMembers(addUsers);
    history.push('/confirmation');
  };

  return (
    <Members
      {...{
        organizationName,
        users,
        isLoading,
        dispatchAddMembers,
        handleAddButton,
      }}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MembersContainer),
);
