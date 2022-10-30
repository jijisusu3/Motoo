pipeline {
    agent any 
    stages {
        stage('Clean') {
            steps {
                script {
                    try {
                        sh "docker stop motoo_react_container"
                        sh "docker stop motoo_fastapi_container"
                        sleep 1
                        sh "docker rm motoo_react_container"
                        sh "docker rm motoo_fastapi_container"
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
                sh "docker build -t motoo_fastapi ./back_fastapi"
            }
        }

        stage('Deploy') {
            steps {
                sh "docker run -d --name=motoo_react_container -p 4000:4000 -p 8081:80 motoo_react"
                sh "docker run --env-file ./.env -d --name=motoo_fastapi_container -p 8080:8080 motoo_fastapi"
                sh "docker image prune --force"

            }
        }
    }
    post {
        always {
            cleanWs()
            dir("${env.WORKSPACE}@tmp") {
            deleteDir()
            }
            dir("${env.WORKSPACE}@script") {
            deleteDir()
            }
            dir("${env.WORKSPACE}@script@tmp") {
            deleteDir()
            }
        }
    }
}