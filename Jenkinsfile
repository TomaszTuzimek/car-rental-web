pipeline {
    agent {
        label 'node-js'
    }
    tools {
        nodejs 'Node 14.20'
    }
    stages {
        stage('Install and Run') {
            steps {
                script {
                    try {
                        sh 'npm install --cache'
                        sh 'npm run dev'
                    } catch (err) {
                        error "Build failed: ${err.message}"
                    }
                }
            }
        }
    }
}