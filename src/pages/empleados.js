import urlWebServices from "../webServices";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import DialogAdd from "../components/AddUserDialog";
import Header from "../components/Header";

export default function Empleados() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [successRegister, setSuccessRegister] = useState(false);

  useEffect(() => {
    const axios = require("axios");
    axios
      .get(urlWebServices.getEmployees)
      .then(function (response) {
        console.log(response.status + " " + response.statusText);
        if (response.status >= 200) setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log("default");
      });
    setRefresh(false);
  }, [refresh]);

  const handleClose = () => {
    setVisible(false);
  };

  function handleDelete(empleado) {
    console.log(empleado.id);
    if (
      window.confirm(
        "¿Seguro que quiere borrar a " +
          empleado.nombre +
          " " +
          empleado.apellido +
          "?"
      )
    ) {
      axios
        .delete(urlWebServices.deleteEmployee + empleado.id)
        .then(function (response) {
          console.log(response.status + " " + response.statusText);
          if (response.status >= 200) alert("¡Borrado exitoso!");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const columns = [
    { title: "DNI", field: "dni", editable: "never" },
    { title: "Nombre", field: "nombre" },
    { title: "Apellido", field: "apellido" },
    { title: "Rol", field: "rol", defaultSort: "asc" },
    { title: "Mail", field: "email" },
    { title: "Dirección", field: "ubicacion.direccion" },
    { title: "Altura", field: "ubicacion.altura" },
    { title: "Piso", field: "ubicacion.piso" },
    { title: "Teléfono", field: "telefono" },
    { title: "Salario ($)", field: "salario" },
  ];

  function handleDelete(empleado) {
    console.log(empleado.id);
    if (
      window.confirm(
        "¿Seguro que quiere borrar a " +
          empleado.nombre +
          " " +
          empleado.apellido +
          "?"
      )
    ) {
      axios
        .delete(urlWebServices.deleteEmployee + empleado.id)
        .then(function (response) {
          console.log(response.status + " " + response.statusText);
          if (response.status >= 200) alert("¡Borrado exitoso!");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <Header />
      <MaterialTable
        title="Empleados"
        columns={columns}
        data={data}
        actions={[
          // rowData => ({
          //     icon: 'delete',
          //     tooltip: 'Eliminar Empleado',
          //     position: 'row',
          //     onClick: (event, rowData) => { handleDelete(rowData) }
          // }),

          {
            icon: "add",
            tooltip: "Crear Empleado",
            isFreeAction: true,
            onClick: () => setVisible(true),
          },

          {
            icon: () => <AttachMoney />,
            tooltip: "Pagar TODOS los sueldos",
            isFreeAction: true,
            onClick: (event) => {
              let promises = new Array();
              data.forEach((empleado) => {
                promises.push(
                  axios.post(
                    " https://bff-banking-app.herokuapp.com/alta-sueldos/",
                    {
                      account_destino: empleado.CBU,
                      monto: empleado.salario,
                      codigo: (Math.floor(Math.random() * 10000) + 10000)
                        .toString()
                        .substring(1),
                      fecha_pago: new Date().toLocaleDateString("zh-Hans-CN"),
                      flag_pagado: false,
                      account_no: "32180802",
                      descripcion:
                        "Pago masivo de Sueldos " +
                        new Date().toLocaleString("default", { month: "long" }),
                    }
                  )
                );
              });
              let fails= new Array();
              let countFails=0
              Promise.allSettled(promises)
                .then((results) => {
                  results.forEach((res)=>{
                      if(res.status === 'rejected'){
                        fails.push(data[results.indexOf(res)].dni);
                      }
                    })
                    if (fails.length === 0) alert("Se han pagado todos los sueldos con éxito!");
                    else  alert("Hubo problemas pagando a los DNIs: \n" + fails.toString());
                })
                .catch((err)=>{
                  console.log(err);
                });
            },
          },

          (rowData) => ({
            icon: () => <AttachMoney />,
            tooltip: "Pagar Empleado",
            onClick: (event, rowData) => {
              // alert(JSON.stringify(rowData));
              // alert("Se le han pagado $" + rowData.salario + " al empleado " + rowData.nombre + " " + rowData.apellido)
              axios
                .post(" https://bff-banking-app.herokuapp.com/alta-sueldos/", {
                  account_destino: rowData.CBU,
                  monto: rowData.salario,
                  codigo: (Math.floor(Math.random() * 10000) + 10000)
                    .toString()
                    .substring(1),
                  fecha_pago: new Date().toLocaleDateString("zh-Hans-CN"),
                  flag_pagado: false,
                  account_no: "32180802",
                  // descripcion: "Prueba Flag"
                  descripcion:
                    "Sueldo " +
                    new Date().toLocaleString("default", { month: "long" }),
                })
                .then((res) => {
                  console.log(res.status + ": " + res.statusText);
                  alert(res.data.respuesta_sueldo);
                })
                .catch((err) => {
                  console.error(err);
                });
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 11,
          pageSizeOptions: [11, 15, 20],
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                console.log(dataUpdate[index]);
                axios
                  .post(urlWebServices.editEmployee, {
                    empleado: dataUpdate[index],
                  })
                  .then((res) => {
                    console.log(res.data);
                    console.log(res.status + ": " + res.statusText);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                console.log(typeof oldData.id);
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                axios
                  .post(urlWebServices.deleteEmployee + oldData.id)
                  .then((res) => {
                    console.log(res.data);
                    console.log(res.status + ": " + res.statusText);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                resolve();
              }, 1000);
            }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Sin Empleados!",
            deleteTooltip: "Dar de  Baja",
            editTooltip: "Editar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
            editRow: {
              deleteText: "¿Seguro que quiere dar de baja a este empleado?",
              cancelTooltip: "Cancelar",
              saveTooltip: "Confirmar",
            },
          },
          header: {
            actions: "Opciones",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas",
            labelRowsPerPage: "filas por página:",
            firstAriaLabel: "Primera Página",
            firstTooltip: "Primera Página",
            previousAriaLabel: "Página Anterior",
            previousTooltip: "Página Anterior",
            nextAriaLabel: "Página Siguiente",
            nextTooltip: "Página Siguiente",
            lastAriaLabel: "Última Página",
            lastTooltip: "Última Página",
          },
          toolbar: {
            addRemoveColumns: "Agregar o Eliminar Columnas",
            nRowsSelected: "{0} fila(s) seleccionada(s)",
            showColumnsTitle: "Mostrar Columnas",
            showColumnsAriaLabel: "Mostrar Columnas",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
        }}

        // components={{
        //     EditRow: props => (
        //         <div style={{ backgroundColor: '#e8eaf5' }}>
        //             <MTableEditRow {...props} />
        //         </div>
        //     )
        // }}
      />
      {/* <ListaEmpleados employee_data={data} visible={visible} /> */}
      <DialogAdd
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
        onSuccess={() => {
          setSuccessRegister(true);
          setRefresh(true);
        }}
      />

      <Dialog
        open={successRegister}
        onClose={() => {
          setSuccessRegister(false);
        }}
      >
        <DialogTitle>¡Éxito!</DialogTitle>
        <DialogContent>
          <Typography>Su registración fue realizada con éxito</Typography>
          {/* <Typography>¡Bienvenido!</Typography> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSuccessRegister(false);
              setVisible(false);
            }}
          >
            Regresar a la Tabla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
