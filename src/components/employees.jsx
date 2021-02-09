import React from 'react';
import Ad from './ad'
import Cookies from 'universal-cookie';

class Employees extends React.Component{
    
    constructor(props, context) {
        super(props, context);
        
        const cookies = new Cookies();
        
        var employees = cookies.get('wbmdqa_employees');
        
        if(!employees){
            employees = resetCookies(employees, cookies);
        }

        this.state = {
            employees: employees
        }
    }

    viewEmployeeDetails(employee) {

        window.location.href = './employees/details?firstName=' + employee.firstName 
            + "&lastName=" + employee.lastName
            + "&title=" + employee.jobTitle
            + "&project=" + employee.currentProject
    }

    resetForm(){
        const cookies = new Cookies();
        var employees = cookies.get('wbmdqa_employees');
        resetCookies(employees, cookies);
        window.location.href = '.';
    }

    deleteEmployee(employeeIndex){
        
        // eslint-disable-next-line no-restricted-globals
        var r = confirm("Are you sure you want to delete this employee");
        
        if (r === true) {
            let index = this.state.employees.map((e, i) => {
                if(employeeIndex === i){
                    
                    return i;                    
                }
            });
            
            let employees = this.state.employees;
            employees.splice(index, 1);

            const cookies = new Cookies();
            cookies.set('wbmdqa_employees', employees, { path: '/' });
            this.setState = {
                employees: employees
            }
        } 
    }

    render(){

        var adIndex = 0;
        var employees = this.state.employees.map((e, i) => {
            if(adIndex < 2){
                adIndex++;
                return (
                    
                        <div className="card employee-list-card" key={i}>
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => this.viewEmployeeDetails(e)}>{e.firstName} {e.lastName}</h5>
                                <p><strong>{e.jobTitle}</strong></p>
                                <a href="#" onClick={() => this.viewEmployeeDetails(e)} className="btn btn-primary">View Details</a>
                                <a href="#" onClick={() => this.deleteEmployee(i)} className="btn btn-danger employee-list-button"><span>Delete Employee</span></a>
                            </div>
                        </div>
                        
                        
                    )
            }else {
                adIndex = 1;
                return (
                    <div>
                        <Ad/>
                        <div className="card employee-list-card" key={i}>
                            <div className="card-body">
                                <h5 className="card-title" onClick={() => this.viewEmployeeDetails(e)}>{e.firstName} {e.lastName}</h5>
                                <p><strong>{e.jobTitle}</strong></p>
                                <button onClick={() => this.viewEmployeeDetails(e)} className="btn btn-primary">View Details</button>
                                <button onClick={() => this.deleteEmployee(e)} className="btn btn-danger employee-list-button"><span>Delete Employee</span></button>
                            </div>
                        </div>
                    </div>
                )
            }
                
        });

        return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Employees</li>
                    </ol>
                </nav>
                <h1>Axis Chemicals Employee Directory</h1>

                <a href="./employees/add" className="btn btn-success">Add Employee</a>
                
                {employees}

                <button onClick={this.resetForm} className="btn btn-danger margin-top-15">Reset Form</button>
            </div>
        );
    }
}

export default Employees;

function resetCookies(employees, cookies) {
    employees = [
        {
            "firstName": "Greg",
            "lastName": "Nettles",
            "jobTitle": "Sr Mobile Developer",
            "currentProject": "Medscape"
        },
        {
            "firstName": "Carl",
            "lastName": "Pavano",
            "jobTitle": "Lead Mobile Developer",
            "currentProject": "WebMD"
        },
    ];

    cookies.set('wbmdqa_employees', employees, { path: '/' });
    return employees;
}
