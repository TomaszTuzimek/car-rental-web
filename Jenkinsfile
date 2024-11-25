pipeline {
  agent any
  stages {
    stage('Install and Run') {
      steps {
        script {
          try {
            sh 'npm install'
          } catch (err) {
            error "Build failed: ${err.message}"
          }
        }

      }
    }

  }
  tools {
    nodejs 'NodeJS 18.18.0'
  }
}