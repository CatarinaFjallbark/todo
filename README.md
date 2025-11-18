# My todo app
Welcome to my todo app created with Next.js. The frontend is built with React components and Tailwind CSS and the backend is a REST API using Next.js API routes for managing todos.

The reason for using Next.js is because it is convinient to use for a basic fullstack application. I have never used Tailwind before but it was the default settings when I created the application and I wanted to try it. Vitest is commonly used so I used it for testing and Swagger is easy and well used for API documentation. 

## How to

Run the application locally:

```bash
npm install
npm run dev
```

Run tests:

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
This app is deployed on Vercel and every push to the main branch will trigger a new deploy.

https://todo-two-theta-87.vercel.app/

## Usage
* add todo by entering title and press enter
* to edit a todo you press the title and the edit view will open, in order to save your edits you press outside or ESC the view.

## Architecture
The frontend is created with several components that is explained below:
* search field
    - search titles of added todos
* sort button
    - inverts the list in view
* add todo field
    - only title will be added
* todo list
    - list of added todos
* edit
    - edit title, add description and due date 
* pagination
    - only visible when more than ten todos, horizontally scrollable when needed.

The backend
* REST
* Pagination
* Sort checked last

## Tests
Some basic tests of the routes are implemented with vitest. Before each test the data is reset and then three different todos are added. Of course a more complete set of tests should be added for the application to be production ready. I have not implemented any unit and component test for this assignment but that can also be done for a real application.

## Documentation
/docs will show the API documentation in Swagger.

## Developer experience
* linting with eslint
* prettier
* node version 24.11.0
* tests run on push with Github action
* API documentation with Swagger

## Further development
* error handling

* UX improvements

* Keyboard commands
