pipeline {
  agent any

  environment {
    GIT_CREDENTIALS = 'token'
    REPO_URL = 'https://github.com/Suhasreddy257/xrdashboard.git'
    DEPLOY_PATH = 'D:\\buildforpipeline'
    NODE_PATH = 'C:\\Program Files\\nodejs'
  }

  stages {
    stage('Checkout') {
      steps {
        // ensure checkout happens
        git branch: 'main', credentialsId: "${GIT_CREDENTIALS}", url: "${REPO_URL}"
      }
    }

    stage('Debug workspace') {
      steps {
        bat 'echo workspace=%WORKSPACE%'
        bat 'echo user=%USERNAME%'
        bat 'echo listing top-level files:'
        bat 'dir /b'
        bat 'echo searching for package.json (recursive):'
        bat 'for /f "delims=" %%i in (\'dir /b /s package.json 2^>nul\') do @echo found: %%i || echo package.json not found'
      }
    }

    stage('Install & Build') {
      steps {
        withEnv(["PATH=${NODE_PATH};${env.PATH}"]) {
          bat '''
            @echo Locating package.json...
            setlocal enabledelayedexpansion
            set "PKG="
            for /f "delims=" %%F in ('dir /b /s package.json 2^>nul') do (
              set "PKG=%%~dpF"
              goto :found
            )
            :found
            if "%PKG%"=="" (
              echo ERROR: package.json not found in workspace && exit /b 1
            )
            echo package.json found in: %PKG%
            cd /d "%PKG%"
            echo running node & npm versions:
            node -v
            npm -v
            echo running npm install...
            npm install
            echo running npm run build...
            npm run build
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        withEnv(["PATH=${NODE_PATH};${env.PATH}"]) {
          bat '''
            if exist dist (
              echo Copying dist to %DEPLOY_PATH%
              xcopy /E /Y dist "%DEPLOY_PATH%"
            ) else (
              echo ERROR: dist not found. Build may have failed. && exit /b 1
            )
          '''
        }
      }
    }
  }

  post {
    success { echo 'Pipeline completed successfully!' }
    failure { echo 'Pipeline failed!' }
  }
}
