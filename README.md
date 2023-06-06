# Book Search Project

This is a CRUD application developed using Angular as the client-side framework and Laravel as the backend RESTful API. It allows users to manage books and authors data.

## Installation

Follow these steps to set up the project:

1. Clone the repository to your local machine:  
```git clone <repository_url>```  
  
  
2. Navigate to the project folder:  
```cd Book-search```  
  
  
3. Backend Setup:  
- Navigate to the backend folder:  
```cd Book-search-backend```  
  
- Install the required dependencies:  
```composer install```  
- Rename the `.env.example` file to `.env` and update the database connection details.

- Generate an application key:  
```php artisan key:generate```  
- Run the database migrations to create the necessary tables:  
```php artisan migrate```  
  
4. Frontend Setup:  
- Navigate to the frontend folder:  
```cd Book-search-frontend```  
 
- Install the required dependencies:  
```npm install```  
  
  
5. Run the Application:  
- Start the backend server:  
```php artisan serve```  
 
- Start the frontend server:  
```ng serve```  

6. Access the application in your browser at `http://localhost:4200`.  
## Database Schema

The project uses MySQL as the database. Below are the table schemas for the `books` and `authors` tables:

### Books

```sql
CREATE TABLE books (
  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  published_date DATE,
  author_name VARCHAR(255),
  author_id INT(10) UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);```  
  
### Authors  
  
```CREATE TABLE authors (
  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  numOfBooks INT(10) UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);```  
  
## Usage  
  
The application provides the following features:

1.**Listing Objects:** The application displays a table that lists books and authors.

2.**Creating Objects:** Users can use the provided form to create new books and authors.

3.**Deleting Objects:** Each object in the table has a delete button that allows users to remove the object.

4.**Updating Objects:** Users can edit the details of a book or author using the provided form.

5.**Filtering by Book Name:** Users can search for authors of a specific book by filtering the list using the book name.

6.**Filtering by Author Name:** Users can search for books written by a specific author by filtering the list using the author name.  
  
Please note that this is a basic overview of the project features. Refer to the source code and relevant documentation for detailed implementation and customization.


 

 


 

 

 

