import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Employees from './components/employees'
import AddEmployee from './components/add-employee'
import EmployeeDetails from './components/employee-details';

function App() {
  function NoMatch({ location }) {
    return (
      <div>
        <h3>
          404!
        </h3>
        <p>Could not find page <code>{location.pathname}</code></p>
      </div>
    );
  }

  return (
    
    <Router>
        <Switch>
          <div className="App">
            <div className="container body-content">
              <Route exact path="/" component={Employees} />
              <Route path="/employees/add" component={AddEmployee}/>  
              <Route path="/employees/details" component={EmployeeDetails}/>  
            </div>      
          </div>
        </Switch>
      </Router>
  );
}

export default App;
