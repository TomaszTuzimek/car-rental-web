pipeline {
  agent {
    node {
      label 'node'
    }

  }
  stages {
    stage('') {
      steps {
        tool(name: 'nodejs', type: 'node')
        npm 'npm install'
        npm 'npm run dev'
      }
    }

  }
}