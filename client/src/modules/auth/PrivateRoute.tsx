import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  path: string;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.getIsAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/authentication',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
