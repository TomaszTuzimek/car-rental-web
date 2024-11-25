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

    stage('test') {
      steps {
        echo 'CI in progress'
      }
    }

    stage('Docker container') {
      steps {
        sh 'npm install'
      }
    }

    stage('Email') {
      steps {
        mail(subject: 'Jenkins test ok', charset: 'utf-8', from: 'test@wulkanizacja.gdynia.pl', replyTo: 'test@wulkanizacja.gdynia.pl', to: 'nes211nes211nes@gmail.com', body: 'Test body')
      }
    }

  }
  tools {
    nodejs 'NodeJS 18.18.0'
  }
}