pipeline {
  agent {
    node {
      label 'nodejs'
    }

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
  tools {
    nodejs 'Node 14.20'
  }
}