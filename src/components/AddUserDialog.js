import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, makeStyles
} from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useRef } from "react";
import * as yup from "yup";
import urlWebServices from "../webServices";

const useStyles = makeStyles({
  input: {
    margin: "0 5% 5% 0",
    // minWidth: '50%',
  },
});

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

  cuil: yup
    .string()
    .matches("([0-9]+(-[0-9]+)+)", "El formato del CUIL es incorrecto")
    .required("¡Este campo es obligatorio!"),

  email: yup
    .string()
    .email("Ingrese un e-mail válido")
    .required("¡Este campo es obligatorio!"),

  telefono: yup
    .string()
    .matches(Number, "Ingrese únicamente números")
    .required("¡Este campo es obligatorio!")
    .min(11, "El número ingresado es muy corto"),

  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "La contraseña debe tener al menos 1 minúscula")
    .matches(/\w*[A-Z]\w*/, "La contraseña debe tener al menos 1 mayúscula")
    .matches(/\d/, "La contraseña debe tener al menos 1 número")
    .matches(
      /[#$%*_=+@]/,
      "La contraseña debe tener al menos 1 símbolo (# $ % * _ = + @)"
    )
    .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
    .required("La contraseña es obligatoria"),
});

export default function DialogAdd(props) {
  const { open, onClose, onSuccess } = props;

  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const validateConfirmPassword = (pass, value) => {
    let error = "";
    if (value === "") error = "¡Este campo es requerido!";
    if (pass && value) {
      if (pass !== value) {
        error = "Las contraseñas no coinciden";
      }
    }
    return error;
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog onClose={onClose} open={open} fullWidth>
        <DialogTitle>Nuevo Empleado</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              dni: "",
              cuil: "",
              nombre: "",
              apellido: "",
              email: "",
              direccion: "",
              altura: "",
              piso: "",
              telefono: "",
              rol: "",
              salario: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("IN");
              axios
                .post(urlWebServices.createEmployee, {
                  cliente: values,
                })
                .then((res) => {
                  onSuccess();
                })
                .catch((err) => {
                  alert(JSON.stringify(err));
                });
            }}
            innerRef={formRef}
          >
            {({ values, errors, touched }) => (
              <Form>
                <Field
                  placeholder="DNI"
                  id="dni"
                  name="dni"
                  className="input-field"
                />
                {errors.dni && touched.dni ? <div>{errors.dni}</div> : null}

                <Field
                  placeholder="CUIL"
                  id="cuil"
                  name="cuil"
                  className="input-field"
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}

                <Field
                  placeholder="Nombre(s)"
                  id="nombre"
                  name="nombre"
                  className="input-field"
                />
                {errors.nombre && touched.nombre ? (
                  <div>{errors.nombre}</div>
                ) : null}

                <Field
                  placeholder="Apellido(s) "
                  id="apellido"
                  name="apellido"
                  className="input-field"
                />
                {errors.apellido && touched.apellido ? (
                  <div>{errors.apellido}</div>
                ) : null}

                <Field
                  placeholder="E-Mail"
                  id="email"
                  name="email"
                  className="input-field"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}

                <Field
                  placeholder="Dirección"
                  id="direccion"
                  name="direccion"
                  className="input-field"
                />
                {errors.direccion && touched.direccion ? (
                  <div>{errors.direccion}</div>
                ) : null}

                <Field
                  placeholder="Altura"
                  id="altura"
                  name="altura"
                  className="input-field"
                />
                {errors.altura && touched.altura ? (
                  <div>{errors.altura}</div>
                ) : null}

                <Field
                  placeholder="Piso"
                  id="piso"
                  name="piso"
                  className="input-field"
                />
                {errors.piso && touched.piso ? <div>{errors.piso}</div> : null}

                <Field
                  placeholder="Teléfono"
                  id="telefono"
                  name="telefono"
                  className="input-field"
                />
                {errors.telefono && touched.telefono ? (
                  <div>{errors.telefono}</div>
                ) : null}

                <Field
                  placeholder="Rol"
                  as="select"
                  id="rol"
                  name="rol"
                  className="input-field"
                >
                  <option value="">Seleccione un Rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </Field>
                {errors.rol && touched.rol ? <div>{errors.rol}</div> : null}

                <Field
                  placeholder="Salario"
                  id="salario"
                  name="salario"
                  className="input-field"
                />
                {errors.salario && touched.salario ? (
                  <div>{errors.salario}</div>
                ) : null}

                <Field
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  className="input-field"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}

                <Field
                  type="password"
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  className="input-field"
                  validate={(value) =>
                    validateConfirmPassword(values.password, value)
                  }
                />

                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
                ) : null}

                {/* <button type="submit">Submit</button> */}
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
