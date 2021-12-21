pipeline {
    triggers { 
        pollSCM('* * * * *') 
    }
    agent any    
    stages {
        stage('NPM Install') {
            steps {
                withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                bat 'npm run ng -- test --progress=false --watch false'
                echo 'TODO: Publish with allure reporter.'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run ng -- build --prod' 
                archiveArtifacts artifacts: '**/dist/RPG/*', fingerprint: true 
            }
        }
        stage('Deploy') {
            steps {
                echo 'TODO: Deploy.'
            }
        }
    }
}
