import React, { Component } from "react"
import employee_data from "../data/employee_data"
import MaterialTable from "material-table"


function ListaEmpleados(){

    const columns=[
        {title:"ID", field:"id"},
        {title:"Nombre", field:"nombre"},
        {title:"Apellido", field:"apellido"},
        {title:"Mail", field:"mail"}
    ]
    
    return(
        <div>
            <MaterialTable title="Empleados"
                columns={columns}
                data={employee_data}
            />
        </div>
    )
}

export default ListaEmpleados