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

    stage('Email') {
      steps {
        emailext(attachLog: true, compressLog: true, subject: 'Car rental web log', body: 'Log in attachment', from: 'log', replyTo: 'thomek03@o2.pl')
      }
    }

  }
  tools {
    nodejs 'Node 14.20'
  }
}