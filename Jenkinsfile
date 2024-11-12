pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        tool(name: 'nodejs', type: 'Node 14.20')
        npm 'install'
        npm 'run dev'
      }
    }

  }
}