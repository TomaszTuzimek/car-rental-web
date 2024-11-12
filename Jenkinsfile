pipeline {
  agent any
  tools{
    nodejs 'Node 14.20'
  }
  stages {
    stage('Install and run') {
      steps {
        npm 'install'
        npm 'run dev'
      }
    }
  }
}