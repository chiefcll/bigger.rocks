import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './routes/signin';
import Home from './routes/home';
import Workout from './routes/workout';
import History from './routes/history';
import Settings from './routes/settings';
import NotFound from './routes/notfound';
import Layout from './components/layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import SimpleStorage from 'react-simple-storage';

class App extends Component {
  componentWillMount() {
		this.setState({
			isAuthed: true
		});
  }

  signIn() {
		return <SignIn auth={false} />;
  }

  render() {
    let { isAuthed } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <SimpleStorage
          parent={this}
          prefix={ 'Workouts' }
        />
        <Router>
            {isAuthed ?
              <Layout isAuthed={isAuthed}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/workout" exact render={() => <Workout></Workout>} />
                  <Route path="/settings" exact component={Settings} />
                  <Route path="/history" exact component={History} />
                  <Route component={NotFound} />
                </Switch>
              </Layout>
            :
              <Route render={this.signIn} />
            }
				</Router>


      </div>
    );
  }
}

export default App;
