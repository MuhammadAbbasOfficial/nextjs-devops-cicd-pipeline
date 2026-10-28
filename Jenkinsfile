pipeline {
    agent any

    environment {
        // Yeh ID humne Jenkins mein save ki thi
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        // Aapka Docker Hub Username
        DOCKER_HUB_USER = 'abbas786777' 
        // Image ka naam jo Docker Hub par banega
        IMAGE_NAME = 'nextjs-devops-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Code GitHub se fetch ho raha hai...'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Docker Image ban rahi hai...'
                // Docker image build karna
                sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Docker Hub par image push ho rahi hai...'
                // Docker Hub mein login karna (credentials use karke)
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                // Image ko push karna
                sh 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
            }
        }
    }
    
    post {
        success {
            echo 'Congrates! Pipeline successfully Completed'
        }
        failure {
            echo 'Pipeline fail ho gayi. Logs check karein.'
        }
    }
}