pipeline {
  agent any
  stages {
    stage('Install node') {
      steps {
        npm 'install'
      }
    }

    stage('error') {
      parallel {
        stage('error') {
          steps {
            echo 'Console message after install'
          }
        }

        stage('Success') {
          steps {
            echo 'All GOOD !'
          }
        }

      }
    }

  }
  tools {
    nodejs 'Node 14.20'
  }
}