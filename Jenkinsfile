pipeline {
  agent any
  stages {
    stage('Install node') {
      steps {
        npm 'install'
      }
    }

    stage('') {
      steps {
        echo 'Console message after install'
      }
    }

  }
  tools {
    nodejs 'Node 14.20'
  }
}