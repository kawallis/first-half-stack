### A simple half-stack app for GET and POST requests using a vanilla HTTP server

- `GET /bicycles` returns array of all bicycles

- `POST /bicycles` inserts the supplied request body (bicycle) as a document into the resource collection

- `GET /bicycles/:id` returns that specific bicycle if found, or a 404 error if it is not located 
