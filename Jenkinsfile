pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(branch: 'main', url: 'https://github.com/TomaszTuzimek/car-rental-web.git')
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
        emailext(subject: 'Build #${BUILD_NUMBER} - ${JOB_NAME}', body: '"""                     <p>Project: ${JOB_NAME}</p>                     <p>Build Number: ${BUILD_NUMBER}</p>                     <p>Build Date: ${BUILD_DATE}</p>                     <p>Build Status: ${currentBuild.currentResult}</p>                     <p>Git Commit: ${env.GIT_COMMIT}</p>                     <p>Build URL: <a href="${BUILD_URL}">${BUILD_URL}</a></p>                 """', mimeType: 'text/html', to: 'nes211nes211nes@gmail.com', replyTo: 'test@wulkanizacja.gdynia.pl', from: 'test@wulkanizacja.gdynia.pl')
      }
    }

  }
  tools {
    nodejs 'NodeJS 18.18.0'
  }
  environment {
    BUILD_DATE = '${new Date().format(\'yyyy-MM-dd HH:mm:ss\')}'
  }
  post {
    always {
      sh 'docker system prune -f'
    }

  }
}