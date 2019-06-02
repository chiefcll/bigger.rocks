import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './routes/signin';
import Home from './routes/home';
import Workout from './routes/workout';
import ExerciseWeight from './routes/exerciseWeight';
import WorkoutTemplates from './routes/workoutTemplates';
import EditWorkoutTemplate from './routes/editWorkoutTemplate';
import History from './routes/history';
import Settings from './routes/settings';
import NotFound from './routes/notfound';
import Layout from './components/layout';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import data from './data';
import reducers from './store/reducers';
import actions from './store/actions';

function signIn() {
    return <SignIn auth={false} />;
}

function App() {
    const [state, dispatch] = useReducer(reducers, {
        ...data.state,
        isAuthed: true
    });

    useEffect(() => {
        return () => {
            data.saveState(state);
        };
    }, []);

    const {
        isAuthed,
        workout,
        workoutTemplates,
        completedWorkouts,
        exerciseWeight,
        settings
    } = state;

    //data.saveState(state);
    //data._resetState();
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
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
                                            exerciseWeight={exerciseWeight}
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
                                            exerciseWeight={exerciseWeight}
                                            actions={actions}
                                            dispatch={dispatch}
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
                                            actions={actions}
                                            dispatch={dispatch}
                                        />
                                    )}
                                />
                                <Route
                                    path="/workoutTemplates"
                                    exact
                                    render={() => (
                                        <WorkoutTemplates
                                            workoutTemplates={workoutTemplates}
                                            dispatch={dispatch}
                                        />
                                    )}
                                />
                                <Route
                                    path="/editWorkoutTemplate/:id"
                                    exact
                                    render={params => (
                                        <EditWorkoutTemplate
                                            workoutTemplates={workoutTemplates}
                                            dispatch={dispatch}
                                            {...params}
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
                        <Route render={signIn} />
                    )}
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
