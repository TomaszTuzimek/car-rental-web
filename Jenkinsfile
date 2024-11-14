pipeline {
    agent {
        label 'nodejs'
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
                    } catch (err) {
                        error "Build failed: ${err.message}"
                    }
                }
            }
        }
    }
}