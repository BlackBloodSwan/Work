Deployment on Cloud Run
gcloud builds submit --tag gcr.io/v135-5683-acp-virtualisationl/sql-generator-webapp
gcloud beta run deploy --image gcr.io/v135-5683-acp-virtualisationl/sql-generator-webapp --platform managed --region europe-west1