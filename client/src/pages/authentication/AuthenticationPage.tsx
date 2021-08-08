import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthContext';

const AuthenticationPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ from: string }>();
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { from } = location.state || { from: { pathname: '/' } };
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      await auth.login(username.value, password.value);
      history.replace(from);
    } catch (error) {
      if (error.message === 'bad credentials') {
        return setError('Bad credentials');
      }
      console.error('auth error: ', error);
      alert('An error occured');
    }
  };

  return (
    <div className="app-page">
      <h1>Authentication</h1>
      <form onSubmit={handleLogin}>
        <div className="form-error">{error}</div>
        <label>
          Username
          <input
            name="username"
            type="username"
            placeholder="Username"
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthenticationPage;
