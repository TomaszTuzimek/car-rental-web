pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        tool(name: 'nodejs', type: 'node 14.20')
        npm 'install'
        npm 'run dev'
      }
    }

  }
}