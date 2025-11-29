pipeline {
    agent any

    environment {
        DOCKERHUB_CRED = "dockerhub"
        GITHUB_CRED = "github-token"
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/ayubazmi/mytry-mean-dd.git', 
                    branch: 'main',
                    credentialsId: env.GITHUB_CRED
                }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build -t ayubazmi/frontend:${BUILD_NUMBER} ./frontend
                docker tag ayubazmi/frontend:${BUILD_NUMBER} ayubazmi/frontend:latest
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t ayubazmi/backend:${BUILD_NUMBER} ./backend
                docker tag ayubazmi/backend:${BUILD_NUMBER} ayubazmi/backend:latest
                """
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: env.DOCKERHUB_CRED,
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh """
                    echo \$PASSWORD | docker login -u \$USERNAME --password-stdin
                    docker push ayubazmi/frontend:${BUILD_NUMBER}
                    docker push ayubazmi/frontend:latest
                    docker push ayubazmi/backend:${BUILD_NUMBER}
                    docker push ayubazmi/backend:latest
                    """
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                sh """
                cd /home/ubuntu/mytry-mean-dd
                docker-compose pull
                docker-compose up -d
                """
            }
        }
    }

    post {
        success { echo "Deployment successful!" }
        failure { echo "Pipeline failed." }
    }
}
