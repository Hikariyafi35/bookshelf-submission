const { nanoid } = require('nanoid');
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = () => {
  if (books.length > 0) {
    return {
      status: "success",
      data: {
        books: books.map(({ id, name, publisher,finished }) => ({ 
          id, 
          name,
          publisher,
          finished,
         })),
      },
    };
  } else {
    return {
      status: "success",
      data: {
        books: [],
      },
    };
  }
};

const getBookByHandler = (request, h) => {
  const { id } = request.params;

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  //menambhakan properti 'finished'
  foundBook.finished = foundBook.pageCount === foundBook.readPage;
  
  const response = h.response({
    status: "success",
    data: {
      book: foundBook,
    },
  });
  response.code(200);
  return response;
};

const updateBookHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const foundBookIndex = books.findIndex((book) => book.id === id);

  if (foundBookIndex === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  books[foundBookIndex] = {
    ...books[foundBookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  books[foundBookIndex].finished = books[foundBookIndex].pageCount === books[foundBookIndex].readPage;

  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const foundBookIndex = books.findIndex((book) => book.id === id);

  if (foundBookIndex === -1) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  books.splice(foundBookIndex, 1);

  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByHandler,
  updateBookHandler,
  deleteBookHandler,
};
