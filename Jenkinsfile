pipeline {
    agent any 
    stages {
        stage('Clean') {
            steps {
                script {
                    try {
                        sh "docker stop motoo_react_container"
                        sleep 1
                        sh "docker rm motoo_react_container"
                    } catch (error) {
                        echo error
                        sh 'exit 0'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t motoo_react ./frontend"
            }
        }

        stage('Deploy') {
            steps {
                sh "docker run -d --name=motoo_react_container -p 8080:8080 motoo_react"
                sh "docker image prune --force"

            }
        }
    }
}