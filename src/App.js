import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './routes/signin';
import Home from './routes/home';
import History from './routes/history';
import Settings from './routes/settings';
import NotFound from './routes/notfound';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

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
        <Router>
            {isAuthed ?
              <React.Fragment>
                <Header />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/settings" exact component={Settings} />
                  <Route path="/history" exact component={History} />
                  <Route component={NotFound} />
                </Switch>
                <Footer hidden={!this.state.isAuthed} />
              </React.Fragment>
            :
              <Route render={this.signIn} />
            }
				</Router>

        
      </div>
    );
  }
}

export default App;
