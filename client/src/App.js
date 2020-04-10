import React, { useState } from 'react';
import Projects from './components/Projects';
import { Route, Switch } from 'react-router-dom';
import Details from './Details';

function App() {
  const [selected, setSelected] = useState(undefined);
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Projects setSelected={setSelected}/>
        </Route>
        <Route path='/:id/details'>
          <Details />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
