const{ addBookHandler, getAllBooksHandler, getBookByHandler, updateBookHandler, deleteBookHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByHandler,
    },
    {
        method:'PUT',
        path:'/books/{id}',
        handler: updateBookHandler,
    },
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:deleteBookHandler,
    }
]

module.exports = routes;