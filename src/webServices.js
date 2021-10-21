const urlApi = "https://integrapps09-back.herokuapp.com/";

const urlWebServices ={
    logInUser: urlApi+'Users/get/',
    getProductsWithStock: urlApi+'Products/get/withStock',
    createSale: urlApi+'add',
    getMarkets: urlApi+'Markets/get/all',
    getSaleCode: urlApi+'obtenerCodigo',
    getSales: urlApi+'Sales/get/',
    confirmSale: urlApi+'Sales/confirm',
    editClient: urlApi+'Users/edit/client',
    deleteProduct: urlApi+'Products/delete/',
    updateProduct: urlApi+'Products/update',
    updateStock: urlApi+'Products/update/',
    createProduct: urlApi+'Products/add/',
    getEmployees: urlApi+'Users/get/all',
    deleteEmployee: urlApi+'Users/delete/',
    editEmployee: urlApi+'Users/edit/employee',
    createEmployee: urlApi+'Users/add/employee',
    createUser: urlApi+'Users/add/user',
    getAllProducts: urlApi+'Products/get/all',

}


export default urlWebServices;
