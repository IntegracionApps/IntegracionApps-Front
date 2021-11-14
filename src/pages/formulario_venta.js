import urlWebServices from "../webServices";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import Header from "../components/Header";
import "../styles/Formulario.css";

// const useStyles = makeStyles({
//     input: {
//         margin: "5% 0 5% 0",
//         // minWidth: '50%',
//     },
// });

const Number = /^[0-9]+$/;

const validationSchema = yup.object({
  nombre: yup
    .string()
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/,
      "Ingrese únicamente letras"
    )
    .required("¡Este campo es obligatorio!"),

  apellido: yup
    .string()
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/,
      "Ingrese únicamente letras"
    )
    .required("¡Este campo es obligatorio!"),

  direccion: yup
    .string()
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/,
      "Ingrese únicamente letras"
    )
    .required("¡Este campo es obligatorio!"),

  altura: yup
    .string()
    .matches(Number, "Ingrese únicamente números")
    .required("¡Este campo es obligatorio!"),

  piso: yup.string().optional(),

  dni: yup
    .string()
    .matches(Number, "Ingrese únicamente números")
    .required("¡Este campo es obligatorio!")
    .min(7, "El DNI ingresado no es correcto")
    .max(8, "El DNI ingresado no es correcto"),

  email: yup
    .string()
    .email("Ingrese un e-mail válido")
    .required("¡Este campo es obligatorio!"),

  telefono: yup
    .string()
    .matches(Number, "Ingrese únicamente números")
    .required("¡Este campo es obligatorio!")
    .min(11, "El número ingresado es muy corto"),

  medioPago: yup.string().required("¡Este campo es obligatorio!"),

  pagoRealizado: yup.string().matches(Number, "Ingrese únicamente números"),

  numero_tarjeta: yup.string().matches(Number, "Ingrese únicamente números"),
  // .min(16, "El número ingresado es muy corto")
  // .max(16, "El número ingresado es muy largo"),

  nombre_titular: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Hay caracteres inválidos"),

  fecha_vencimiento: yup.string().optional(),

  codigo_seguridad: yup.string().matches(Number, "Ingrese únicamente números"),
});

export default function NuevaVenta(props) {
  const history = useHistory();
  const [receive, setReceive] = useState(props.location.state.toSend);

  const user = JSON.parse(window.localStorage.getItem("user"));
  // console.log(receive);
  // console.log(user);
  const [successOpen, setSuccessOpen] = useState(false);
  const [purchaseCode, setPurchaseCode] = useState("");
  const [flagPaymentOK, setFlagPayment] = useState(false);
  if (user.ubicacion.piso.length === 0) {
    user.ubicacion.piso = "-";
  }

  const formik = useFormik({
    initialValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      direccion: user.ubicacion.direccion,
      altura: user.ubicacion.altura,
      piso: user.ubicacion.piso,
      dni: user.dni,
      email: user.email,
      telefono: user.telefono,
      fechaEmision: new Date(),
      items: receive.items,
      subTotal: receive.subtotal,
      total: receive.total,
      descuentoTotal: receive.subtotal - receive.total,
      medioPago: 0,
      pagoRealizado: "",
      vuelto: null,
      estado: "Emitido",
      otros1: "IVA RESPONSABLE INSCRIPTO",
      otros2: "A RESPONSABLE FINAL",
      sucursal: null,
      codigoCompra: "",
      numero_tarjeta: "",
      nombre_titular: "",
      fecha_vencimiento: "",
      codigo_seguridad: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.medioPago >= "2" || values.medioPago <= "4") {
        console.log("CARD");
        values.pagoRealizado = values.total;
        values.vuelto = 0;
        // estado_pago_tarjeta = "Creado";
      }
      if (values.medioPago == "1") {
        console.log("CASH");
        values.vuelto = values.pagoRealizado - receive.total;
      }

      //INTEGRACIÓN TARJETA DE CRÉDITO A
      var url = "";
      var parametros = {};
      var res = {};
      switch (parseInt(values.medioPago)) {
        case 2:
          console.log("CARD");
          values.pagoRealizado = values.total;
          values.vuelto = 0;
          url = "https://viernes-ia.herokuapp.com/addConsumo";
          parametros = {
            numero: values.numero_tarjeta,
            cuit: "20-40769036-7",
            codseg: values.codigo_seguridad,
            fechaven: values.fecha_vencimiento,
            // precio: values.total,
            precio: values.total,
            descripcion:
              "Compra 'El Changuito', día " + new Date().toLocaleDateString(),
          };
          console.log(url);
          console.log(parametros);
          break;
        case 3:
          console.log("CARD");
          values.pagoRealizado = values.total;
          values.vuelto = 0;
          console.log(values.sucursal.cuit);
          console.log(values.sucursal.CUIT);
          url =
            "https://ia-grupo4-backend.herokuapp.com/api/users/agregarMovimiento";
          parametros = {
            dnicuilUsuario: user.dni,
            cuitNegocio: 30590360763,
            numerotarjeta: values.numero_tarjeta,
            monto: values.total,
            codigoseguridad: values.codigo_seguridad,
          };
          console.log(url);
          console.log(parametros);
          break;
      }
      axios
        .post(url, parametros)
        .then(function (response) {
          alert(
            response.status +
              " " +
              response.statusText +
              "\n" +
              response.data.message
          );
          res = response.data;
        })
        .catch(function (err) {
          alert(err);
        });

      console.log(res);
      var market = null;
      if (res.comprobante !== null) {
        axios
          .post(urlWebServices.createSale, {
            values: values,
          })
          .then(function (response) {
            console.log(response.status + " " + response.statusText);
            console.log(response.data);
            market = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
          axios.get(urlWebServices.getSaleCode).then((res) => {
            // console.log(typeof res.data);
            // console.log(res.data);
            setPurchaseCode(res.data);
            // console.log(purchaseCode);
            setSuccessOpen(true);
          })
          .catch(function (err){
            console.log(err);
          });
      }
    },
  });

  // const classes = useStyles();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(urlWebServices.getMarkets)
      .then((res) => {
        formik.values.sucursal = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    setRefresh(false);
    // console.log(formik.values);
  }, [refresh]);

  function handleGoTo() {
    localStorage.setItem("finished", true);
    history.push("/Home");
  }

  return (
    <div>
      <Header />
      <h1
        style={{
          marginBottom: "40px",
          marginTop: "30px",
          fontFamily: "Calibri",
        }}
      >
        Nuevo envío a domicilio
      </h1>
      <div className="content">
        <div>
          <form onSubmit={formik.handleSubmit} className="form">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                onChange={(event) => {
                  console.log(event.target.checked);
                  if (event.target.checked === true) {
                    formik.setFieldValue("direccion", "");
                    formik.setFieldValue("altura", "");
                    formik.setFieldValue("piso", "");
                  }
                  if (event.target.checked === false) {
                    formik.setFieldValue("direccion", user.ubicacion.direccion);
                    formik.setFieldValue("altura", user.ubicacion.altura);
                    formik.setFieldValue("piso", user.ubicacion.piso);
                  }
                  setRefresh(true);
                }}
              />
              <h3>Quiero enviar mi compra a otra dirección</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                name="nombre"
                label="Nombre *"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                className={"root"}
                variant="outlined"
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
              <TextField
                name="apellido"
                label="Apellido *"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                className={"root"}
                variant="outlined"
                error={
                  formik.touched.apellido && Boolean(formik.errors.apellido)
                }
                helperText={formik.touched.apellido && formik.errors.apellido}
              />
            </div>
            <TextField
              name="direccion"
              label="Dirección *"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              className={"root"}
              variant="outlined"
              error={
                formik.touched.direccion && Boolean(formik.errors.direccion)
              }
              helperText={formik.touched.direccion && formik.errors.direccion}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                name="altura"
                label="Altura *"
                value={formik.values.altura}
                onChange={formik.handleChange}
                className={"root"}
                variant="outlined"
                error={formik.touched.altura && Boolean(formik.errors.altura)}
                helperText={formik.touched.altura && formik.errors.altura}
              />

              <TextField
                name="piso"
                label="Piso"
                value={formik.values.piso}
                onChange={formik.handleChange}
                className={"root"}
                variant="outlined"
                error={formik.touched.piso && Boolean(formik.errors.piso)}
                helperText={formik.touched.piso && formik.errors.piso}
              />
            </div>

            <TextField
              className={"root"}
              id="email"
              name="email"
              label="E-mail *"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={"root"}
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                name="dni"
                label="DNI *"
                value={formik.values.dni}
                onChange={formik.handleChange}
                className={"root"}
                variant="outlined"
                error={formik.touched.dni && Boolean(formik.errors.dni)}
                helperText={formik.touched.dni && formik.errors.dni}
              />

              <TextField
                name="telefono"
                label="Teléfono *"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                className={"root"}
                /* style={{backgroundColor: "lightgreen"}} */
                variant="outlined"
                error={
                  formik.touched.telefono && Boolean(formik.errors.telefono)
                }
                helperText={formik.touched.telefono && formik.errors.telefono}
              />
            </div>

            <div className="custom-select">
              <select
                id="medioPago"
                value={formik.values.medioPago}
                label="Seleccione un medio de pago *"
                onChange={formik.handleChange}
              >
                <option value={0}>Seleccione un medio de pago</option>
                <option value={1}>Efectivo</option>
                <option value={2}>Tarjeta de Crédito 'Entidad A'</option>
                <option value={3}>Tarjeta de Crédito 'Entidad B'</option>
                <option value={4}>Débito</option>
              </select>
              <span className="custom-arrow"></span>
            </div>
            {formik.errors.medioPago && (
              <div style={{ color: "#ff0000" }}>{formik.errors.medioPago}</div>
            )}

            {formik.values.medioPago != 1 ? null : (
              <div>
                <TextField
                  fullWidth
                  name="pagoRealizado"
                  label="¿Cuánto efectivo se entregó?"
                  value={formik.values.pagoRealizado}
                  onChange={formik.handleChange}
                  variant="outlined"
                  error={
                    formik.touched.pagoRealizado &&
                    Boolean(formik.errors.pagoRealizado)
                  }
                  helperText={
                    formik.touched.pagoRealizado && formik.errors.pagoRealizado
                  }
                />
              </div>
            )}

            {formik.values.medioPago != 2 &&
            formik.values.medioPago != 3 ? null : (
              <React.Fragment>
                <div style={{ paddingTop: "20px" }}>
                  <TextField
                    fullWidth
                    name="numero_tarjeta"
                    label="Número de Tarjeta"
                    value={formik.values.numero_tarjeta}
                    onChange={formik.handleChange}
                    variant="outlined"
                    error={
                      formik.touched.numero_tarjeta &&
                      Boolean(formik.errors.numero_tarjeta)
                    }
                    helperText={
                      formik.touched.numero_tarjeta &&
                      formik.errors.numero_tarjeta
                    }
                  />
                </div>

                <div style={{ paddingTop: "20px" }}>
                  <TextField
                    fullWidth
                    name="nombre_titular"
                    label="Nombre y Apellido del Titular"
                    value={formik.values.nombre_titular}
                    onChange={formik.handleChange}
                    variant="outlined"
                    error={
                      formik.touched.nombre_titular &&
                      Boolean(formik.errors.nombre_titular)
                    }
                    helperText={
                      formik.touched.nombre_titular &&
                      formik.errors.nombre_titular
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <div style={{ paddingRight: "10px", width: "100%" }}>
                    <TextField
                      fullWidth
                      name="fecha_vencimiento"
                      label="Fecha de Vencimiento"
                      value={formik.values.fecha_vencimiento}
                      onChange={formik.handleChange}
                      variant="outlined"
                      error={
                        formik.touched.fecha_vencimiento &&
                        Boolean(formik.errors.fecha_vencimiento)
                      }
                      helperText={
                        formik.touched.fecha_vencimiento &&
                        formik.errors.fecha_vencimiento
                      }
                    />
                  </div>

                  <div style={{ paddingLeft: "10px", width: "100%" }}>
                    <TextField
                      fullWidth
                      type="password"
                      name="codigo_seguridad"
                      label="Código de Seguridad"
                      value={formik.values.codigo_seguridad}
                      onChange={formik.handleChange}
                      variant="outlined"
                      error={
                        formik.touched.codigo_seguridad &&
                        Boolean(formik.errors.codigo_seguridad)
                      }
                      helperText={
                        formik.touched.codigo_seguridad &&
                        formik.errors.codigo_seguridad
                      }
                    />
                  </div>
                </div>
              </React.Fragment>
            )}

            <Typography>
              Monto a pagar: $ {formik.values.total.toFixed(2)}
            </Typography>

            <Button
              type="submit"
              style={{
                backgroundColor: "lightgreen",
                color: "black",
                width: "auto",
                height: "50px",
                marginTop: "7.5%",
                borderRadius: "50px",
              }}
            >
              Confirmar Compra
            </Button>
            <Button
              onClick={() => {
                history.goBack();
              }}
              style={{
                backgroundColor: "lightsalmon",
                color: "black",
                width: "auto",
                height: "50px",
                marginTop: "7.5%",
                marginBottom: "20px",
                borderRadius: "50px",
              }}
            >
              Volver
            </Button>
          </form>
        </div>
      </div>
      <Dialog
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
        }}
      >
        <DialogTitle>¡Éxito!</DialogTitle>
        <DialogContent>
          <Typography>¡La operación se realizó con éxito!</Typography>
          {formik.values.medioPago !== "Efectivo" ? (
            <Typography> Tu código de compra es: '{purchaseCode}'</Typography>
          ) : null}
          <Typography>¡Gracias por elegirnos!</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleGoTo();
            }}
          >
            Al Menú Principal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
