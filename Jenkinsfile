pipeline {
  agent {
    label 'node-js'
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
  tools {
    nodejs 'Node 14.20'
  }
}