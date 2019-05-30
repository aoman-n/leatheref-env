import React, { FC, useState, FormEvent, SyntheticEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Form from 'components/Organizations/Form';
import { getMembers } from '../../actions/github';
import { RootStateType } from '../../reducers';

interface StateProps {
  isLoading: boolean;
}

interface DispatchProps {
  getMembersStart: (organizationName: string) => void;
}

type EnhancedFormProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  isLoading: state.github.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getMembersStart: (organizationName: string) =>
        getMembers.start({ organizationName }),
    },
    dispatch,
  );

const OrganizationsFormContainer: FC<EnhancedFormProps> = ({
  isLoading,
  getMembersStart,
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string, e?: SyntheticEvent) => {
    setValue(newValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      getMembersStart(value);
    }
  };

  return (
    <Form
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      value={value}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationsFormContainer);
