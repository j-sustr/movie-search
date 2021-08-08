import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthContext';

const AuthenticationPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ from: string }>();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      await auth.login(username.value, password.value);
      history.replace(from);
    } catch (error) {
      if (error.message === 'bad credentials') {
        alert('Bad credentials');
        return;
      }
      console.error(error);
      alert('An error occured');
    }
  };

  return (
    <div>
      <h1>Authentication</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input name="username" type="username" placeholder="Username" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthenticationPage;
