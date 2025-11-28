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
                sh """
                docker build --no-cache -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend
                docker build --no-cache -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend

                """
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'echo $PASS | docker login -u "$USER" --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}
                docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}
                """
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    sh """
                    echo "Updating docker-compose image versions..."

                    sed -i "s|image:[[:space:]]*${DOCKERHUB_USER}/${FRONTEND_IMAGE}:.*|image: ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml
                    sed -i "s|image:[[:space:]]*${DOCKERHUB_USER}/${BACKEND_IMAGE}:.*|image: ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml

                    echo "Pulling latest images..."
                    docker-compose pull

                    echo "Stopping & removing old containers..."
                    docker rm -f mongo backend frontend || true

                    echo "Starting updated containers..."
                    docker-compose down --remove-orphans
                    docker-compose up -d
                    """
                }
            }
        }

        /* ✅ FINAL FIXED STAGE: Commit Updated docker-compose.yml to GitHub */
        stage('Commit & Push Updated File to GitHub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-key',
                        usernameVariable: 'GH_USER',
                        passwordVariable: 'GH_TOKEN'
                    )
                ]) {
                    sh """
                    git config user.email "jenkins@example.com"
                    git config user.name "Jenkins CI"

                    git add docker-compose.yml
                    git commit -m "Update docker images to tag ${BUILD_NUMBER}" || true

                    git push https://${GH_USER}:${GH_TOKEN}@github.com/ayubazmi/MEAN-DD.git main
                    """
                }
            }
        }
    }
}
