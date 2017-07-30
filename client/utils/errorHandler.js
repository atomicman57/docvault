exports.errorHandler = (error) => {
  if (error.response) {
    const errorMessage = error.response.data;
    Materialize.toast(errorMessage.message, 5000);
  } else {
    Materialize.toast(error, 5000);
  }
};
