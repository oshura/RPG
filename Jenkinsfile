pipeline {    
    agent any    
    triggers { 
        pollSCM('H */4 * * 1-5') 
    }
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
                //archiveArtifacts artifacts: '**/dist/RPG/*', fingerprint: true 
                stash includes: '**/dist/RPG/*', name: 'RPG'
                echo 'Built.'
            }
        }
        stage('Deploy') {
            agent { label 'windows' }
            steps {
                unstash 'RPG'
                bat 'xcopy . "C:\\www\\frontend_01" /s /e'
                echo 'Deployed.'
            }
        }
    }
}
