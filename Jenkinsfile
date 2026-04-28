pipeline {
    agent any

    environment {

        //Take from Jenkins Credentials
        FE_AUTH_SECRET        = credentials('FE_AUTH_SECRET_ID')

        BE_MONGODB_URI        = credentials('BE_MONGODB_URI_ID')
        BE_JWT_SECRET         = credentials('BE_JWT_SECRET_ID')
        BE_MAIL_USER          = credentials('BE_MAIL_USER_ID')
        BE_MAIL_PASS          = credentials('BE_MAIL_PASS_ID')
        BE_CLOUDINARY_KEY     = credentials('BE_CLOUDINARY_KEY_ID')
        BE_CLOUDINARY_SECRET  = credentials('BE_CLOUDINARY_SECRET_ID')

        //Hard code
        FE_BACKEND_URL        = '/api/v1'

        BE_PORT               = '8000'
        BE_JWT_EXPIRED        = '1000d'
        BE_CLOUDINARY_NAME    = 'diparg13r'
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

    stage('Prepare Environment Files') {
            steps {
                script {
                    sh '''
                    echo "AUTH_SECRET=${FE_AUTH_SECRET}" > HazHzel_App/.env
                    echo "NEXT_PUBLIC_BACKEND_URL=${FE_BACKEND_URL}" >> HazHzel_App//.env
                    '''

                    sh '''
                    echo "PORT=${BE_PORT}" > HazHzel_Server/.env
                    echo "MONGODB_URI=${BE_MONGODB_URI}" >> HazHzel_Server/.env
                    echo "JWT_SECRET=${BE_JWT_SECRET}" >> HazHzel_Server/.env
                    echo "JWT_ACCESS_TOKEN_EXPIRED=${BE_JWT_EXPIRED}" >> HazHzel_Server/.env
                    echo "MAILDEV_INCOMING_USER=${BE_MAIL_USER}" >> HazHzel_Server/.env
                    echo "MAILDEV_INCOMING_PASS=${BE_MAIL_PASS}" >> HazHzel_Server/.env
                    echo "CLOUDINARY_NAME=${BE_CLOUDINARY_NAME}" >> HazHzel_Server/.env
                    echo "CLOUDINARY_API_KEY=${BE_CLOUDINARY_KEY}" >> HazHzel_Server/.env
                    echo "CLOUDINARY_API_SECRET=${BE_CLOUDINARY_SECRET}" >> HazHzel_Server/.env
                    '''
                }
            }
        }
        stage('Docker Build & Deploy') {
            steps {
                sh 'docker compose build backend'                
                sh 'docker compose build frontend'
                sh 'docker compose up -d --build --force-recreate'
            }
        }

        stage('Post-Deployment Cleanup') {
            steps {
                sh 'rm HazHzel_Server/.env HazHzel_App/.env'
            }
        }
    }
}