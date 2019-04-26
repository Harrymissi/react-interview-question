import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import HomePage from './components/Home/HomePage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer'
import Jobs from './components/Job';
import JobDetail from './components/Job/job_block/jobDetail';

function App() {
  return (
      <Router>
          <div className="App">
              <Header/>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/jobs" component={Jobs}/>
              <Route path="/job_detail/:id" exact component={JobDetail}/>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;
