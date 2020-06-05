exports.PromiseHandler = (promisse) => (
  promisse.then((data) => ({ data })).catch((error) => ({ error }))
)
