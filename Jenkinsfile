pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "ayubazmi"
        FRONTEND_IMAGE = "mean-dd_frontend"
        BACKEND_IMAGE  = "mean-dd_backend"
    }

    triggers {
        githubPush()
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
                docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend
                docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend
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
                sh """
                sed -i "s|${FRONTEND_IMAGE}:.*|${FRONTEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml
                sed -i "s|${BACKEND_IMAGE}:.*|${BACKEND_IMAGE}:${BUILD_NUMBER}|g" docker-compose.yml

                docker-compose pull
                docker-compose down --remove-orphans
                docker-compose up -d
                """
            }
        }

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
                    git commit -m "Update docker images to tag ${BUILD_NUMBER} [skip ci]" || true

                    git push https://${GH_USER}:${GH_TOKEN}@github.com/ayubazmi/MEAN-DD.git main
                    """
                }
            }
        }
    }
}
