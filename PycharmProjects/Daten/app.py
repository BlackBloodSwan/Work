from flask import Flask, request
import os
import json
from google.oauth2 import service_account
import googleapiclient.discovery


app = Flask(__name__)


@app.route('/login', methods=['POST'])
def iam_api():
    data = json.loads(request.data.decode('utf-8'))

    project_id = data.get('project_id')
    role = data.get('role')
    member = data.get('e-mail')
    if project_id and role and member != '':
        credentials = service_account.Credentials.from_service_account_file(
            filename=os.environ['GOOGLE_APPLICATION_CREDENTIALS'],
            scopes=['https://console.cloud.google.com/iam-admin/iam?authuser=1&orgonly=true&project='.format(project_id)])
        service = googleapiclient.discovery.build(
            'cloudresourcemanager', 'v1', credentials=credentials)

        policy = service.projects().getIAMPolicy(
            resource=project_id, body={}).execute()
        print(policy)

        binding = next(b for b in policy['bindings'] if b['role'] == role)
        binding['members'].append(member)
        print(binding)

        policy = service.projects().setIamPolicy(
                resource=project_id, body={
                    'policy': policy
                }).execute()
        print(policy)
    else:
        return "Not enough data available", 200
    return data

@app.errorhandler(503)
def server_error(e):
    return "Service is not available".format(e), 503


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))