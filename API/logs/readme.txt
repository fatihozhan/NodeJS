

/*****PRODUCT ROUTES*****/
/api/products - GET => Fetch all products
/api/products/:id - GET => Fetch spesific product
/api/products - POST => New product(name, price, description, imageUrl)
/api/products/:id - PUT => Update product
/api/products /:id - DELETE => Delete product
/api/products/comment/:id - PUT => New product comment
/api/products/comment/:id - DELETE => Delete spesific product comment




/*****CATEGORY ROUTES*****/
/api/categories - GET => Fetch all categories
/api/categories/:id - GET => Fetch spesific categories
/api/categories - POST =>  New category
/api/categories - PUT => Update spesific category
/api/categories - DELETE => Delete spesific category




/******USER ROUTES******/
/api/users/create - POST => new User(email, password)
/api/users/auth - POST => User login(email, password)

