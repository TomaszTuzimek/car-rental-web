pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18.18.0'
    }
    stages {
        stage('Install and Run') {
            steps {
                script {
                    try {
                        sh 'npm install'
                        sh 'npm run dev'
                    } catch (err) {
                        error "Build failed: ${err.message}"
                    }
                }
            }
        }
    }
}