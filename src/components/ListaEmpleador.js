import React, { Component } from "react"
// import employee_data from "../data/employee_data"
import MaterialTable from "material-table"
import axios from "axios";




function ListaEmpleados(props) {
    const columns = [
        { title: "Nombre", field: "nombre" },
        { title: "Apellido", field: "apellido" },
        { title: "Rol", field: "rol" },
        { title: "Mail", field: "email" },
    ]

    console.log(props.employee_data);

    const handleAdd= (event) => {
        props.onVisible(true)
    }

    function handleDelete(empleado){
        console.log(empleado.id);
        if(window.confirm("¿Seguro que quiere borrar a "+ empleado.nombre +" "+ empleado.apellido +"?")){
            axios.delete('http://localhost:5000/Users/delete/' + empleado.id)
            .then( function (response){
                console.log(response.status + " " + response.statusText);
                if (response.status >= 200) alert("¡Borrado exitoso!")
            })
            .catch(function (error) {
                console.log(error);
            })

        }
    }

    return (
        <div>
            <MaterialTable title="Empleados"
                columns={columns}
                data={props.employee_data}
                actions={[
                    rowData=> ({
                        icon: 'delete',
                        tooltip: 'Eliminar Empleado',
                        onClick: (event, rowData) => {handleDelete(rowData)}
                    }),

                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => handleAdd
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                  }}            
            />
        </div>
    )
}

export default ListaEmpleados