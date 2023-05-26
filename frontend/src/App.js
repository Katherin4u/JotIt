import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Notebooks from "./components/Notebooks";
import AllNotes from "./components/Notes";
// import CreateTasks from "./components/CreateTask";
import AllTasks from "./components/AllTasks";
import AllTags from "./components/AllTags";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/notebooks">
            <Notebooks />
          </Route>
          <Route path="/notebook/:noteId">
            <AllNotes />
          </Route>
          <Route path="/tasks" >
            <AllTasks />
            <AllTags />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;