pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "ayubazmi"       // your dockerhub username
        FRONTEND_IMAGE = "mean-dd_frontend"
        BACKEND_IMAGE = "mean-dd_backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-secret',
                    url: 'https://github.com/ayubazmi/MEAN-DD.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Frontend Image"
                    sh "docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"

                    echo "Building Backend Image"
                    sh "docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh "docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy to Server via SSH') {
            steps {
                sshagent (credentials: ['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@3.109.209.6 '
                        cd MEAN-DD &&
                        docker pull ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} &&
                        docker pull ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} &&
                        docker compose down &&
                        sed -i "s|${DOCKERHUB_USER}/mean-dd_frontend.*|${DOCKERHUB_USER}/mean-dd_frontend:${BUILD_NUMBER}|g" docker-compose.yml &&
                        sed -i "s|${DOCKERHUB_USER}/mean-dd_backend.*|${DOCKERHUB_USER}/mean-dd_backend:${BUILD_NUMBER}|g" docker-compose.yml &&
                        docker compose up -d
                    '
                    """
                }
            }
        }
    }
}
