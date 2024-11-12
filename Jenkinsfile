pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        tool(name: 'nodejs', type: 'node')
        npm 'install'
        npm 'run dev'
      }
    }

  }
}