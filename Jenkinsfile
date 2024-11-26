pipeline {
  agent any
  tools {
    nodejs 'NodeJS 18.18.0'
  }
  triggers {
    pollSCM('H/5 * * * *')
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/TomaszTuzimek/car-rental-web.git'
      }
    }


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
        sh 'docker build -t car-rental-web-app .'
      }
    }

    stage('Email') {
      steps {
        mail(subject: 'Jenkins test ok', charset: 'utf-8', from: 'test@wulkanizacja.gdynia.pl', replyTo: 'test@wulkanizacja.gdynia.pl', to: 'nes211nes211nes@gmail.com', body: 'Test body')
      }
    }

  }
    post {
        always {
            sh 'docker system prune -f'
        }
    }  
}