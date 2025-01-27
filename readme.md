# Category Management API

This API allows you to manage categories, subcategories, and items in your application. Below are the details of the available endpoints and their usage.

## Endpoints 

### Create Category

- **URL:** `/category/create`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Category Name",
    "image": "Image URL",
    "description": "Category Description",
    "taxApplicable": true,
    "tax": 10,
    "taxType": "percentage"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "category_id",
    "name": "Category Name",
    "image": "Image URL",
    "description": "Category Description",
    "taxApplicable": true,
    "tax": 10,
    "taxType": "percentage",
    "__v": 0
  }
  ```

### Get All Categories

- **URL:** `/category/all`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "category_id",
      "name": "Category Name",
      "image": "Image URL",
      "description": "Category Description",
      "taxApplicable": true,
      "tax": 10,
      "taxType": "percentage",
      "__v": 0
    },
    // ...other categories
  ]
  ```

### Get Category by Name or ID

- **URL:** `/category/search`
- **Method:** `GET`
- **Query Parameters:**
  - `id` (optional): Category ID
  - `name` (optional): Category Name
- **Response:**
  ```json
  {
    "_id": "category_id",
    "name": "Category Name",
    "image": "Image URL",
    "description": "Category Description",
    "taxApplicable": true,
    "tax": 10,
    "taxType": "percentage",
    "__v": 0
  }
  ```

### Edit Category

- **URL:** `/category/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "Updated Category Name",
    "image": "Updated Image URL",
    "description": "Updated Category Description",
    "taxApplicable": true,
    "tax": 15,
    "taxType": "fixed"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "category_id",
    "name": "Updated Category Name",
    "image": "Updated Image URL",
    "description": "Updated Category Description",
    "taxApplicable": true,
    "tax": 15,
    "taxType": "fixed",
    "__v": 0
  }
  ```

### Create SubCategory

- **URL:** `/subcategory/create/:categoryId`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "SubCategory Name",
    "image": "Image URL",
    "description": "SubCategory Description",
    "taxApplicability": true,
    "tax": 5
  }
  ```
- **Response:**
  ```json
  {
    "_id": "subcategory_id",
    "name": "SubCategory Name",
    "image": "Image URL",
    "description": "SubCategory Description",
    "taxApplicability": true,
    "tax": 5,
    "category": "category_id",
    "__v": 0
  }
  ```

### Get All SubCategories

- **URL:** `/subcategory/all`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "subcategory_id",
      "name": "SubCategory Name",
      "image": "Image URL",
      "description": "SubCategory Description",
      "taxApplicability": true,
      "tax": 5,
      "category": "category_id",
      "__v": 0
    },
    // ...other subcategories
  ]
  ```

### Get SubCategories by Category

- **URL:** `/subcategory/category/:categoryId`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "subcategory_id",
      "name": "SubCategory Name",
      "image": "Image URL",
      "description": "SubCategory Description",
      "taxApplicability": true,
      "tax": 5,
      "category": "category_id",
      "__v": 0
    },
    // ...other subcategories under the category
  ]
  ```

### Get SubCategory by Name or ID

- **URL:** `/subcategory/search`
- **Method:** `GET`
- **Query Parameters:**
  - `id` (optional): SubCategory ID
  - `name` (optional): SubCategory Name
- **Response:**
  ```json
  {
    "_id": "subcategory_id",
    "name": "SubCategory Name",
    "image": "Image URL",
    "description": "SubCategory Description",
    "taxApplicability": true,
    "tax": 5,
    "category": "category_id",
    "__v": 0
  }
  ```

### Edit SubCategory

- **URL:** `/subcategory/:subCategoryId`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "Updated SubCategory Name",
    "image": "Updated Image URL",
    "description": "Updated SubCategory Description",
    "taxApplicability": true,
    "tax": 10
  }
  ```
- **Response:**
  ```json
  {
    "_id": "subcategory_id",
    "name": "Updated SubCategory Name",
    "image": "Updated Image URL",
    "description": "Updated SubCategory Description",
    "taxApplicability": true,
    "tax": 10,
    "category": "category_id",
    "__v": 0
  }
  ```

### Create Item

- **URL:** `/item/create`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Item Name",
    "image": "Image URL",
    "description": "Item Description",
    "taxApplicability": true,
    "tax": 5,
    "baseAmount": 100,
    "discount": 10,
    "categoryId": "category_id",
    "subcategoryId": "subcategory_id"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "item_id",
    "name": "Item Name",
    "image": "Image URL",
    "description": "Item Description",
    "taxApplicability": true,
    "tax": 5,
    "baseAmount": 100,
    "discount": 10,
    "totalAmount": 90,
    "categoryId": "category_id",
    "subcategoryId": "subcategory_id",
    "__v": 0
  }
  ```

### Get All Items

- **URL:** `/item/all`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "item_id",
      "name": "Item Name",
      "image": "Image URL",
      "description": "Item Description",
      "taxApplicability": true,
      "tax": 5,
      "baseAmount": 100,
      "discount": 10,
      "totalAmount": 90,
      "categoryId": "category_id",
      "subcategoryId": "subcategory_id",
      "__v": 0
    },
    // ...other items
  ]
  ```

### Get Items by Category

- **URL:** `/item/category/:categoryId`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "item_id",
      "name": "Item Name",
      "image": "Image URL",
      "description": "Item Description",
      "taxApplicability": true,
      "tax": 5,
      "baseAmount": 100,
      "discount": 10,
      "totalAmount": 90,
      "categoryId": "category_id",
      "subcategoryId": "subcategory_id",
      "__v": 0
    },
    // ...other items under the category
  ]
  ```

### Get Items by SubCategory

- **URL:** `/item/subcategory/:subcategoryId`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "item_id",
      "name": "Item Name",
      "image": "Image URL",
      "description": "Item Description",
      "taxApplicability": true,
      "tax": 5,
      "baseAmount": 100,
      "discount": 10,
      "totalAmount": 90,
      "categoryId": "category_id",
      "subcategoryId": "subcategory_id",
      "__v": 0
    },
    // ...other items under the subcategory
  ]
  ```

### Get Item by Name or ID

- **URL:** `/item/search`
- **Method:** `GET`
- **Query Parameters:**
  - `id` (optional): Item ID
  - `name` (optional): Item Name
- **Response:**
  ```json
  {
    "_id": "item_id",
    "name": "Item Name",
    "image": "Image URL",
    "description": "Item Description",
    "taxApplicability": true,
    "tax": 5,
    "baseAmount": 100,
    "discount": 10,
    "totalAmount": 90,
    "categoryId": "category_id",
    "subcategoryId": "subcategory_id",
    "__v": 0
  }
  ```

### Edit Item

- **URL:** `/item/:itemId`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "Updated Item Name",
    "image": "Updated Image URL",
    "description": "Updated Item Description",
    "taxApplicability": true,
    "tax": 10,
    "baseAmount": 120,
    "discount": 20,
    "categoryId": "category_id",
    "subcategoryId": "subcategory_id"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "item_id",
    "name": "Updated Item Name",
    "image": "Updated Image URL",
    "description": "Updated Item Description",
    "taxApplicability": true,
    "tax": 10,
    "baseAmount": 120,
    "discount": 20,
    "totalAmount": 100,
    "categoryId": "category_id",
    "subcategoryId": "subcategory_id",
    "__v": 0
  }
  ```

### Search Items by Name

- **URL:** `/search`
- **Method:** `GET`
- **Query Parameters:**
  - `name` (required): Item Name
- **Response:**
  ```json
  [
    {
      "_id": "item_id",
      "name": "Item Name",
      "image": "Image URL",
      "description": "Item Description",
      "taxApplicability": true,
      "tax": 5,
      "baseAmount": 100,
      "discount": 10,
      "totalAmount": 90,
      "categoryId": "category_id",
      "subcategoryId": "subcategory_id",
      "__v": 0
    },
   
  ]
  ```

## Running the Application Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/anirbanpati/Menu-management-api
   cd Menu-management-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up the `.env` file:**
   Create a `.env` file in the root directory and add the environment variables as described below.

4. **Start the server:**
   ```sh
   npm start
   ```

5. **Access the API:**
   Open your browser or API client (e.g., Postman) and navigate to `http://localhost:4000`.

## Setting up the .env file

Create a `.env` file in the root directory of your project and add the following environment variables:

```properties
PORT=4000
DB_CONNECT=mongodb://localhost:27017/menuManagement
DB_NAME=menuManagement
```

For MongoDB Atlas, use the following format:

```properties
PORT=4000
DB_CONNECT=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
DB_NAME=menuManagement
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<dbname>` with your actual MongoDB credentials and database information.

## Setting up MongoDB

### MongoDB Local

1. **Download and install MongoDB:**
   [MongoDB Download](https://www.mongodb.com/try/download/community)

2. **Start the MongoDB server:**
   ```sh
   mongod
   ```

3. **Create a database:**
   Open a new terminal and run:
   ```sh
   mongo
   use menuManagement
   ```

### MongoDB Atlas

1. **Create a MongoDB Atlas account:**
   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster:**
   Follow the instructions to create a new cluster.

3. **Get the connection string:**
   Go to the cluster's "Connect" section and get the connection string. Replace `<username>`, `<password>`, `<cluster-url>`, and `<dbname>` with your actual MongoDB credentials and database information.

## Using Postman

You can use Postman to test the API endpoints. Follow these steps:

1. **Download and install Postman:**
   [Postman Download](https://www.postman.com/downloads/)

2. **Import the Postman collection:**
   [Menu Management API Postman Collection](https://www.postman.com/interstellar-satellite-239368/menu-management-api/overview)

3. **Set up the environment:**
   Create a new environment in Postman and add the following variables:
   - `baseUrl`: `http://localhost:4000`

4. **Test the endpoints:**
   Use the imported collection to test the API endpoints. Make sure to set the `baseUrl` variable in the environment.

## Running the Application with Docker

1. **Build the Docker image:**
   ```sh
   docker build -t menu-management-api .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -d -p 4000:4000 --name menu-management-api menu-management-api
   ```

3. **Access the API:**
   Open your browser or API client (e.g., Postman) and navigate to `http://localhost:4000`.

## Running the Application with Docker Compose

1. **Build and start the Docker containers:**
   ```sh
   docker-compose up --build
   ```

2. **Access the API:**
   Open your browser or API client (e.g., Postman) and navigate to `http://localhost:4000`.

