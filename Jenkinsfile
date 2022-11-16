pipeline {
    agent any 
    stages {
        stage('Clean') {
            steps {
                script {
                    try {
                        sh "docker stop motoo_react_container"
                        sh "docker stop motoo_spring_container"
                        sleep 1  
                        sh "docker rm motoo_react_container"
                        sh "docker rm motoo_spring_container"
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
                // sh "docker build -t motoo_fastapi ./back_fastapi"
                sh "docker build -t motoo_spring ./backend/stock"
            }
        }

        stage('Deploy') {
            steps {
                sh "docker run -d  -e TZ=Asia/Seoul --name=motoo_react_container -p 4000:4000 -p 8081:80 motoo_react"
                // sh "docker run --env-file /home/.env -d --name=motoo_fastapi_container -p 8080:8000 motoo_fastapi"
                sh "docker run -d -e TZ=Asia/Seoul --name=motoo_spring_container -p 8082:8080 motoo_spring"
                sh "docker image prune --force"

            }
        }
    }
}