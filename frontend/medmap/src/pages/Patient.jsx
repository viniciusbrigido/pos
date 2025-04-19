import UserList from './UserList.jsx';

export default function Patient() {
  return (
    <UserList
      userType={'PATIENT'}
      entityLabel={'Paciente'}
    />
  );
}
