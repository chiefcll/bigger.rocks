import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './routes/signin';
import Home from './routes/home';
import Workout from './routes/workout';
import ExerciseWeight from './routes/exerciseWeight';
import History from './routes/history';
import Settings from './routes/settings';
import NotFound from './routes/notfound';
import Layout from './components/layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import data from './data';

class App extends Component {
    state = {
        ...data.state,
        isAuthed: true
    };

    signIn() {
        return <SignIn auth={false} />;
    }

    componentWillUnmount() {
        data.saveState(this.state);
    }

    onCompleteWorkout = workout => {
        this.setState(state =>
            data.actions.completeWorkout({
                ...state,
                workout
            })
        );
    };

    render() {
        const { isAuthed, workout, completedWorkouts, exerciseWeight, settings } = this.state;
        data.saveState(this.state);
        data._resetState();
        return (
            <div className="App">
                <CssBaseline />
                <Router>
                    {isAuthed ? (
                        <Layout isAuthed={isAuthed}>
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={() => (
                                        <Home
                                            nextWorkout={workout}
                                            completedWorkouts={
                                                completedWorkouts
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    path="/workout"
                                    exact
                                    render={() => (
                                        <Workout
                                            workout={workout}
                                            completeWorkout={
                                                this.onCompleteWorkout
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    path="/exerciseWeight"
                                    exact
                                    render={() => (
                                        <ExerciseWeight
                                            exerciseWeight={exerciseWeight}
                                            settings={settings}
                                        />
                                    )}
                                />
                                <Route
                                    path="/settings"
                                    exact
                                    component={Settings}
                                />
                                <Route
                                    path="/history"
                                    exact
                                    component={History}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </Layout>
                    ) : (
                        <Route render={this.signIn} />
                    )}
                </Router>
            </div>
        );
    }
}

export default App;
