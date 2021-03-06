import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeContext } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import styles from 'turtle-ui';

import './styles/App.scss';

import theme from './theme';
import Topbar from './Containers/Layout/Topbar';
import Main from './Containers/Layout/Main';
import Navigation from './Containers/Layout/Navigation';
import Footer from './Containers/Layout/Footer';
import NotFound from './Containers/Layout/NotFound';
import SomethingsView from './Containers/SomethingsView';
import AnythingsView from './Containers/AnythingsView';
import TagsView from './Containers/TagsView';
import DesignGuide from './Containers/DesignGuide';

import SearchBar from './Components/SearchBar';
import SomethingDetails from './Components/SomethingDetails';
import AnythingDetails from './Components/AnythingDetails';
import TagDetails from './Components/TagDetails';
import TagEdit from './Components/TagEdit';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={theme}>
        <Router>
          <Topbar>
            <Navigation />
          </Topbar>

          <div className="container">
            <SearchBar />
          </div>

          <Main className="container">
            <Switch>
              <Route exact path="/">
                <SomethingsView />
              </Route>

              {/* Somethings */}
              <Route exact path="/somethings">
                <SomethingsView />
              </Route>
              <Route path="/somethings/:id">
                {({ match }) => <SomethingDetails id={match.params.id} />}
              </Route>

              {/* Anythings */}
              <Route exact path="/anythings">
                <AnythingsView />
              </Route>
              <Route path="/anythings/:id">
                {({ match }) => <AnythingDetails id={match.params.id} />}
              </Route>

              {/* Tags */}
              <Route exact path="/tags">
                <TagsView />
              </Route>
              <Route exact path="/tags/:id">
                {({ match }) => <TagDetails id={match.params.id} />}
              </Route>
              <Route exact path="/tags/:id/edit">
                {({ match }) => <TagEdit id={match.params.id} />}
              </Route>

              {/* Design */}
              <Route exact path="/design">
                <DesignGuide />
              </Route>

              {/* 404 */}
              <Route>
                <NotFound />
              </Route>
            </Switch>

          </Main>

          <div className="container">
            <hr style={{ marginBottom: 0 }} />
            <Footer />
          </div>
        </Router>
      </ThemeContext.Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
