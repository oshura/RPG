pipeline {
    triggers { 
        pollSCM('H */4 * * 1-5') 
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
                bat 'ng test --progress=false --watch false'
                echo 'TODO: Publish with allure reporter.'
            }
        }

        stage('Build') {
            steps {
                bat 'npm build --prod' 
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
