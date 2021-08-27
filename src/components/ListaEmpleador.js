import React, { Component } from "react"
import employee_data from "../data/employee_data"
//import "../../node_modules/css/"


class ListaEmpleados extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }


    render() {
        return(
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className= "row">
                    <table className="table table-striped table-bordered">
                        
                        
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Mail</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                employee_data.map((empleado) => (
                                    <tr key = {empleado.id}>
                                        <td>{empleado.id}</td>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.apellido}</td>
                                        <td>{empleado.mail}</td>
                                    </tr>

                                ))
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        )
    }



}

export default ListaEmpleados