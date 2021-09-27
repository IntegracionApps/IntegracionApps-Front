import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Tooltip } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router';
import { CartProvider, useCart } from "react-use-cart";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import '../styles/ProductCard.css';
import * as yup from 'yup';



// import Pic from "@material-ui/icons/PhotoSizeSelectActualRounded";


// import product_data from "../data/product_data.js";
const Number = /^[0-9]+$/;

const validationSchema = yup.object({

    nombre: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    descripcion: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    tipoUnidad: yup
        .string()
        .matches(/^[a-zA-Z_]+$/, 'Ingrese una sola palabra')
        .required('¡Este campo es obligatorio!'),

    price: yup
        .string()
        .matches(/[0-9.,]/, "Ingrese un número decimal")
        .required('¡Este campo es obligatorio!'),

    stock: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!'),


    puntoRepo: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!')
});

function CreateItemDialog(props) {
    const { setRefresh, open, onClose } = props;

    const handleClose = () => {
        onClose();
    }

    const formRef = useRef();

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <React.Fragment>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Nuevo Producto</DialogTitle>
                <DialogContent dividers>
                    <Formik
                        initialValues={{
                            nombre: '',
                            descripcion: '',
                            categoria: '',
                            tipoUnidad: '',
                            price: '',
                            stock: '',
                            puntoRepo: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("IN");
                            axios.post('http://localhost:5000/Products/add/', {
                                producto: values,
                            })
                                .then((res) => {
                                    alert(res.data + " " + res.status + ": " + res.statusText);
                                    if (res.status === 200) {
                                        handleClose();
                                        setRefresh();
                                    }
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}

                        innerRef={formRef}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <Field placeholder="Nombre" id="nombre" name="nombre" className='input-field' />
                                {errors.nombre && touched.nombre ? (
                                    <div>{errors.nombre}</div>
                                ) : null}

                                <Field placeholder="Descripción" id="descripcion" name="descripcion" className='input-field' />
                                {errors.descripcion && touched.descripcion ? (
                                    <div>{errors.descripcion}</div>
                                ) : null}

                                <Field placeholder="Categoría" id="categoria" name="categoria" className='input-field' />
                                {errors.categoria && touched.categoria ? (
                                    <div>{errors.categoria}</div>
                                ) : null}

                                <Field placeholder="Tipo de Unidad" id="tipoUnidad" name="tipoUnidad" className='input-field' />
                                {errors.tipoUnidad && touched.tipoUnidad ? (
                                    <div>{errors.tipoUnidad}</div>
                                ) : null}

                                <Field placeholder="Precio Unitario" id="price" name="price" className='input-field' />
                                {errors.price && touched.price ? (
                                    <div>{errors.price}</div>
                                ) : null}

                                <Field placeholder="Stock" id="stock" name="stock" className='input-field' />
                                {errors.stock && touched.stock ? (
                                    <div>{errors.stock}</div>
                                ) : null}

                                <Field placeholder="Punto de Reposición" id="puntoRepo" name="puntoRepo" className='input-field' />
                                {errors.puntoRepo && touched.puntoRepo ? (
                                    <div>{errors.puntoRepo}</div>
                                ) : null}

                                {/* <button type="submit">Submit</button> */}
                            </Form>
                        )}

                    </Formik>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="secondary">Confirmar Alta</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default function HomeAdmin() {
    // console.log(product_data);

    const [product_data, setData] = useState([]);
    const [products_copy, setProductsCopy] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false)

    const [refresh, setRefresh]=useState(false);
    const [open, setOpen] = useState(false);

    const finished = localStorage.getItem("finished");

    const history = useHistory();

    const {
        items,
        isEmpty,
        totalUniqueItems,
        setItems,
        addItem,
        removeItem,
        emptyCart,
        updateItemQuantity,
        getItem,
        inCart,
    } = useCart();


    useEffect(() => {
        axios.get('http://localhost:5000/Products/get/withStock')
            .then(function (response) {
                // console.log(response);
                setData(response.data);
                setProductsCopy(response.data);
                setRefresh(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(finished);
        if (finished === "true" || window.localStorage.getItem("loggedOut") === "true") {
            setItems([]);
            localStorage.setItem("finished", false);
            localStorage.setItem("loggedOut", false);
        }
        else setItems(items);
        // console.log("hipótesis");
    }, [refresh]);


    const popOpen = Boolean(popoverOpen);
    const id = popOpen ? 'simple-popover' : undefined;


    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {
        console.log(item);
        var filterFlag = false;
        if (!isEmpty) {
            console.log(items.filter(product => item.id === product.id));
            if (items.filter(product => item.id === product.id)) {
                items.map((product) => {
                    if (item.id === product.id) {
                        updateItemQuantity(product.id, 1);
                        filterFlag = true;
                    }
                })
            }
        }
        addItem(item);
        console.log(getItem(item.id));
        if (!filterFlag) setOpen(true);
    }

    function handleRemoveItem(item) {
        console.log(item);
        var filterFlag = false;
        if (!isEmpty) {
            console.log(items.filter(product => item.id === product.id));
            if (items.filter(product => item.id === product.id)) {
                items.map((product) => {
                    if (item.id === product.id) {
                        removeItem(product.id);
                        filterFlag = true;
                    }
                })
            }
        }
        removeItem(item);
        console.log(removeItem(item.id));
        if (!filterFlag) setOpen(true);
    }

    function handleItemUpdate(item, qtty, exceeds) {
        if (item.stock > 0) {
            switch (qtty) {
                case -1:
                    if (getItem(item.id).quantity - 1 === 0) removeItem(item.id);
                    else {
                        updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                        // setWillDisable(false);
                    }
                    break;
                case 1:
                    // if (getItem(item.id).quantity + 1 >= item.stock) setWillDisable(true);
                    updateItemQuantity(item.id, getItem(item.id).quantity + qtty);
                    break;
            }
        }
    }

    function handleGoTo(itemsToSend, history) {
        if (!isEmpty) history.push({
            pathname: '/Shopping_Cart',
            state: (itemsToSend)
        });
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        if (searchValue !== "") {
            setData(
                products_copy.filter((item) => (
                    item.nombre.toLowerCase().match(event.target.value.toLowerCase()) || item.categoria.toLowerCase().match(event.target.value.toLowerCase()))
                )
            );
            // console.log(searchValue.toL);
        }
        if (searchValue === "") setData(products_copy);
    }


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header onSearchBarChange={handleSearchChange} searchValue={searchValue} />
            <CartProvider>
                <div className="fab">
                    <Tooltip title="Alta de Producto">
                        <Fab className="button" variant="extended" onClick={() => setOpen(true)}>
                            <Add />
                            Crear
                        </Fab>
                    </Tooltip>
                    {/* <Chip style={{ marginTop: "10%", backgroundColor: "orange", color: "black" }}
                        label={
                            isEmpty ? "¡Sin productos!" : totalUniqueItems + " Ítem(s)"
                        }>
                    </Chip>
                    {isEmpty ? null :
                        <Chip style={{ marginTop: "5%", backgroundColor: "red", color: "white" }} label="Vaciar Carrito" onClick={() => { emptyCart(); }} />
                    } */}
                </div>
                <div className="container_home">
                    <p>HOME ADMIN</p>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {product_data.map((item) => {
                            const isThere = inCart(item.id)
                            return (
                                <div className="card" key={item.id}>
                                    {!isThere ?
                                        <div className="card_header">
                                            <h2>{item.nombre}</h2>
                                            <p>{item.descrip}</p>
                                            <p className="price">AR$ {item.price} x [ {item.tipoUnidad} ]</p>
                                            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                <button className="btn" onClick={() => handleAddItem(item)}>Editar Producto</button>
                                                <DeleteIcon fontSize="large" color="secondary" onClick={() => handleRemoveItem(item)} />
                                            </div>
                                        </div>
                                        :
                                        <Badge className="card_header" badgeContent={getItem(item.id).quantity} color="primary" anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                                            <ProductCard
                                                item={getItem(item.id)}
                                                handleAddFather={(item) => { handleAddItem(item) }}
                                                handleFatherItemUpdate={(item, qtty) => { handleItemUpdate(item, qtty) }}
                                            />
                                        </Badge>
                                    }
                                </div>
                            )
                        })}

                    </div>
                </div>

                <CreateItemDialog setRefresh={() => setRefresh(true)} open={open} history={history} onClose={() => handleClose()} />

            </CartProvider >
        </div >
    )
}
