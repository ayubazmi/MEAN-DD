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

## CI/CD Pipeline (Jenkins)
  The Jenkins pipeline includes:

  Checkout from GitHub

  Build frontend & backend Docker images

  Push images to Docker Hub

  Update docker-compose.yml with new tags

  Pull and restart application containers

  Commit updated files back to GitHub

## Trigger

  Pipeline triggers automatically when new code is pushed to GitHub, or manually from Jenkins dashboard.  

## How to Deploy on Ubuntu VM
## Install Docker & Docker Compose & Jenkins 
```bash
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
sudo apt install openjdk-17-jre-headless -y
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins

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

## Nginx Reverse Proxy Configuration
 Located inside frontend/nginx.conf

## Screenshorts

## Dockerhub 
<img width="906" height="330" alt="docker images" src="https://github.com/user-attachments/assets/2a263527-42ca-4962-b682-528df2ebf24d" />

## App images 
1)  <img width="868" height="368" alt="Screenshot_14" src="https://github.com/user-attachments/assets/c526cdb6-f8b0-4860-8d23-352c021f20d8" />

2)  <img width="773" height="322" alt="Screenshot_15" src="https://github.com/user-attachments/assets/290bf63a-6625-48e2-b52a-ee51e31b7b63" />

3)   <img width="847" height="364" alt="Screenshot_16" src="https://github.com/user-attachments/assets/a216a3f2-0993-4b79-861d-7cddbe6c2fe4" />


## Build Screen 
1)  <img width="903" height="466" alt="Screenshot_18" src="https://github.com/user-attachments/assets/1fd4f4b8-f360-4875-b498-31e6513baf62" />

2) <img width="924" height="431" alt="Screenshot_19" src="https://github.com/user-attachments/assets/1ab25b49-409c-48ed-88d4-b7800b74b558" />

3) <img width="768" height="416" alt="Screenshot_20" src="https://github.com/user-attachments/assets/8c2cc3c3-6f27-4966-a62b-124f06f72303" />


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

### Angular Client.

cd frontend

npm install

Run `ng serve --port 8081`

You can modify the `src/app/services/tutorial.service.ts` file to adjust how the frontend interacts with the backend.

Navigate to `http://localhost:8081/`
