pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "ayubazmi"
        FRONTEND_IMAGE = "mean-dd_frontend"
        BACKEND_IMAGE  = "mean-dd_backend"
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

                    echo 'Building Backend Image'
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
                sh "docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}"
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    echo "Updating docker-compose.yml with latest tags..."

                    sh """
                    sed -i 's|${DOCKERHUB_USER}/${FRONTEND_IMAGE}:.*|${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}|g' docker-compose.yml
                    sed -i 's|${DOCKERHUB_USER}/${BACKEND_IMAGE}:.*|${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}|g' docker-compose.yml

                    echo 'Pulling latest images...'
                    docker compose pull

                    echo 'Restarting services...'
                    docker compose down
                    docker compose up -d
                    """
                }
            }
        }
    }
}
