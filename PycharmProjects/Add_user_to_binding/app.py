from flask import Flask, jsonify, request
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
CORS(app, resources={r"add_user_to_binding": {"origins": "https://auto-iam-web-app-bg4m6eql4q-ew.a.run.app/"}})

#cross
@app.route('/add_user_to_binding', methods=['POST'])
@cross_origin()
def api_post():
    try:
        data = json.loads(request.data.decode('utf-8'))
    except Exception as exc:
        print(str(exc))
        return jsonify("Cannot extract data"), 503
    iam_api(data)
    return "End"

def iam_api(req):
    project_id = req.get("project_id")
    access = req.get("role")
    member = "user:" + req.get("e_mail")
    print(member)
    credentials = GoogleCredentials.get_application_default()
    service = discovery.build('iam', 'v1', credentials=credentials)

    reqe = service.roles().list(pageSize=1000)
    response = reqe.execute()

    service = discovery.build('cloudresourcemanager', 'v1', credentials=credentials)
    policy = service.projects().getIamPolicy(resource=project_id, body={}).execute()


    role_exist = get_roles(response, access, reqe, credentials)
    if role_exist == None:
        return jsonify("role does not exist")
    else:
        modify_policy_add_member(policy, access, member)
        if modify_policy_add_member == None:
            return jsonify("role cannot be added")
        else:
            set_policies = set_policy(credentials, project_id, policy)
            if set_policies == "bad":
                return jsonify("change cannot be uploaded")
            else:
                return jsonify("Successful")


def get_roles(response, access, reqe, credentials):
    service = discovery.build('iam', 'v1', credentials=credentials)
    for role in response.get('roles', []):
        title = role.get('title')
        if access == title:
            print(role)
            return role
        else:
            reqe = service.roles().list_next(previous_request=reqe, previous_response=response)

    if request is None:
        print("Role is not available")
        return None


def modify_policy_add_member(policy, access, member):
    try:
        access = access.lower()
        role = "roles/" + access
        binding = next(b for b in policy['bindings'] if b['role'] == role)
        binding['members'].append(member)
        print(binding)
    except:
        print("User cannot be added to the bindings")
        return None


def set_policy(credentials, project_id, policy):
    try:
        service = discovery.build('cloudresourcemanager', 'v1', credentials=credentials)
        policy = service.projects().setIamPolicy(resource=project_id, body={'policy': policy}).execute()
        print(policy)
        return policy
    except:
        print("Change cannot be set")
        return "bad"


if __name__ == '__main__':
    app.run( debug=True)
    #app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))