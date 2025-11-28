==============================================================================================================================
==============================================================================================================================

# MEAN-DD Project – Dockerized MEAN Stack with CI/CD (Jenkins) & Nginx Reverse Proxy

This project contains a complete MEAN stack (MongoDB, Express.js, Angular, Node.js) fully Dockerized and deployed using Docker Compose.  
It includes an automated CI/CD pipeline using Jenkins that:

- Builds updated Docker images for frontend & backend
- Pushes images to Docker Hub
- Updates docker-compose.yml with new tags
- Automatically redeploys the application on the server
- Commits updated versions back to GitHub

Nginx is used as a reverse proxy to expose the entire application on port **80**.

---

##  Project Architecture
GitHub → Jenkins CI/CD → Docker Hub → Ubuntu VM → Docker Compose → MEAN App (Frontend + Backend + MongoDB)

---

---

## Services inside docker-compose.yml:

  frontend – Angular build served via Nginx

  backend – Node/Express server

  mongo – MongoDB official image

## Install Docker & Docker Compose
```bash
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
```

## Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/MEAN-DD.git
cd MEAN-DD
```

## Run the stack
```bash
docker-compose up -d
```
## Application will be available at:
```bash
👉 http://YOUR-SERVER-IP:80
```

---



                                        END OF Deployment of Cloud
==========================================================================================================================================================================================================================================================


                                              To Run locally 


In this DevOps task, you need to build and deploy a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, and Node.js). The backend will be developed with Node.js and Express to provide REST APIs, connecting to a MongoDB database. The frontend will be an Angular application utilizing HTTPClient for communication.  

The application will manage a collection of tutorials, where each tutorial includes an ID, title, description, and published status. Users will be able to create, retrieve, update, and delete tutorials. Additionally, a search box will allow users to find tutorials by title....

## Project setup

### Node.js Server

cd backend

npm install

You can update the MongoDB credentials by modifying the `db.config.js` file located in `app/config/`.

Run `node server.js`

### Angular Client

cd frontend

npm install

Run `ng serve --port 8081`

You can modify the `src/app/services/tutorial.service.ts` file to adjust how the frontend interacts with the backend.

Navigate to `http://localhost:8081/`
