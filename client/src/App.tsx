import './App.css';
import AuthenticationPage from './pages/authentication/AuthenticationPage';
import SearchPage from './pages/search/SearchPage';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <header>
            <a href="/">Movie Search</a>
          </header>

          <Switch>
            <Route path="/authentication">
              <AuthenticationPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Redirect to="/search" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
