pipeline {
    agent any

    environment {
        // Credentials binding
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_HUB_USER = 'abbas786777' 
        IMAGE_NAME = 'nextjs-devops-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code GitHub se fetch ho raha hai...'
                // Agar aapne Jenkins job mein Git configure kiya hai, toh yeh automatic hota hai.
                checkout scm 
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Docker Image ban rahi hai (Tag: ${env.BUILD_NUMBER})..."
                
                // BuildKit caching aur multiple tags (Single line command - No syntax errors)
                sh "DOCKER_BUILDKIT=1 docker build --cache-from ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Docker Hub par image push ho rahi hai...'
                
                // Login securely
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                
                // Push both tags (latest and build number)
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
        }
        
        stage('Cleanup') {
            steps {
                echo 'Disk space clean ki ja rahi hai...'
                // Purani dangling images delete karna taake EC2 ka disk full na ho
                sh 'docker image prune -f'
            }
        }
    }
    
    post {
        success {
            echo "✅ Pipeline successfully Completed! Image Tag: ${env.BUILD_NUMBER}"
        }
        failure {
            echo '❌ Pipeline fail ho gayi. Logs check karein.'
        }
        always {
            // Secure logout
            sh 'docker logout || true'
        }
    }
}