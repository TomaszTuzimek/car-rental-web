pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        tool(name: 'nodejs', type: 'nodejs 14.20.1')
        npm 'install'
        npm 'run dev'
      }
    }

  }
}