# Second Treasures BookStore AngularJS App

This is a simple CRUD appliation for a mock company, *Second Treasures BookStore*, done using AngularJS.

## Supported Functionalities
Since this is a CRUD application, the typical operations are all supported:

* **C**: Create a new book
* **R**: Read the book list
* **U**: Update the information of any book
* **D**: Delete a book

Naturally, *Read* is available for every user, but *Create*, *Update* and *Delete* are only avaiable as a logged in employee.

Due to time constrain, here are 2 things that couldn't be implemented for now:

* **Login**: Right now the UI responds correctly to whether the user is logged in (employee) or not (customer). However, the login process is only simulated; click on the **Employee Login** button to fake a login session.
* **Data Persistance in database**: The list of books is stored in the `server.js` file in memory instead of a database. Restart the server will perge all the data. Given more time, I'll hook this up with a MongoDB database.

---

## Tech Stack
* **Front-end**: AngularJS, Semantic UI, Jasmine, ES6
* **Back-end**: NodeJS, Express
* **Tools**: Babel, npm, ESLint, Karam, VS Code

---

## Self Assessment
### Back-end

- [x] Loads without errors
- [ ] Multiple modules/components/class (This is a heavy front-end application, so server is very small)
- [x] Error handling
- [x] RESTful
- [x] Good formatting and comments
- [x] Can list, view, create, update, delete

### Front-end
- [x] Loads without errors
- [x] Multiple modules/components/class
- [x] Data binding (1-way when showing; 2-way when creating, updating and deleting)
- [x] Mobile friendly (Used Semantic UI, which looks pretty good on mobile)
- [x] Good formatting and comments
- [x] Can list, view, create, update, dete

### QA
- [x] 5 unit tests (TDD): `BookStoreController.spec.js` contains 8 for the controller.
- [x] Written paragraph: Included in the PDF file.

### DevOps
- [ ] Check out code from public repository
- [ ] Build code (if applicable) 
- [ ] Change configuration setting
- [x] Deploy app to cloud-hosted environment