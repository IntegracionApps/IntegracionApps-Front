const urlApi = "https://integrapps-back.onrender.com/";
// const urlApi = "localhost:8080";

const urlWebServices ={
    logInUser: urlApi+'Users/get/',
    getEmployees: urlApi+'Users/get/all',
    editClient: urlApi+'Users/edit/client',
    deleteEmployee: urlApi+'Users/delete/',
    editEmployee: urlApi+'Users/edit/employee',
    createUser: urlApi+'Users/add/client',
    createEmployee: urlApi+'Users/add/employee',
    
    getProductsWithStock: urlApi+'Products/get/withStock',
    createSale: urlApi+'add',
    getMarkets: urlApi+'Markets/get/all',
    getSaleCode: urlApi+'obtenerCodigo',
    deleteProduct: urlApi+'Products/delete/',
    updateProduct: urlApi+'Products/update',
    updateStock: urlApi+'Products/update/',
    createProduct: urlApi+'Products/add/',
    getAllProducts: urlApi+'Products/get/all',
    // confirmSale: urlApi+'Sales/confirm/',
    getSales: urlApi+'Sales/get/',
    confirmSale: urlApi+'Sales/confirm',
}


export default urlWebServices;
