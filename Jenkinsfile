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
                sh "docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
                sh "docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}"
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    sh """
                    echo "Updating docker-compose image versions..."

                    # Correct sed commands that match full line like:
                    # image: ayubazmi/mean-dd_frontend:latest
                    # image: ayubazmi/mean-dd_backend:latest
                    sed -i "s|image: ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:.*|image: ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml
                    sed -i "s|image: ${DOCKERHUB_USER}/${BACKEND_IMAGE}:.*|image: ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml

                    echo "Pulling latest images..."
                    docker-compose pull

                    echo "Force removing old containers..."
                    docker rm -f mongo || true
                    docker rm -f backend || true
                    docker rm -f frontend || true

                    echo "Restarting containers..."
                    docker-compose down --remove-orphans
                    docker-compose up -d
                    """
                }
            }
        }
    }
}
