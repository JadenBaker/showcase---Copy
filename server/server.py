from flask import Flask, request  # type: ignore
from realDB import ProjectDB, MessagesDB

app = Flask(__name__)

def manual_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept, applicaiton/json'
    return response

@app.route('/messages', methods=['GET'])
def get_messages():
    db = MessagesDB('messages.db')
    messages = db.getMessages()
    return messages, {"Access-Control-Allow-Origin": "*"}

@app.route('/message', methods=['POST'])
def create_message():
    print('creating message')

    data = request.json

    print(data, ' message data to store ')

    if not data:
        response = app.response_class(
            response='{"error": "No JSON data received"}',
            status=400,
            mimetype='application/json'
        )
        return response
    if 'message' not in data:
        response = app.response_class(
            response='{"error": "No message provided"}',
            status=400,
            mimetype='application/json'
        )
        return response
        
    db = MessagesDB('messages.db')
    db.createMessage(data['message'])
    response = app.response_class(
        response='{"message": "Message created"}',
        status=201,
        mimetype='application/json'
    )
    return response



@app.route('/projects', methods=['GET'])
def get_projects():
    db = ProjectDB('projects.db')
    projects = db.getProjects()
    return projects, {"Access-Control-Allow-Origin": "*"}

@app.route('/project/<id>', methods=['GET'])
def get_project(id):
    db = ProjectDB('projects.db')
    project = db.getProject(id)

    print(project, ' project data ')    
    
    if project:
        response_str = '{' + \
            f'"id": "{str(project[0])}", ' + \
            f'"name": "{str(project[1])}", ' + \
            f'"description": "{str(project[2])}", ' + \
            f'"requirements": "{str(project[3])}", ' + \
            f'"image": "{str(project[4])}", ' + \
            f'"results": "{str(project[5])}", ' + \
            f'"clientTech": "{str(project[6])}", ' + \
            f'"apiTech": "{str(project[7])}", ' + \
            f'"dbTech": "{str(project[8])}"' + \
        '}'
        
        response = app.response_class(
            response=response_str,
            status=200,
            mimetype='application/json'
        )
    else:
        response = app.response_class(
            response='{"error": "Project not found"}',
            status=404,
            mimetype='application/json'
        )
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/createproject', methods=['POST'])
def create_project():
    try:
        data = request.json
        if not data:
            response = app.response_class(
                response='{"error": "No JSON data received"}',
                status=400,
                mimetype='application/json'
            )
            return response
        
        db = ProjectDB('projects.db')
        
        required_fields = ['name', 'description', 'requirements', 'img', 'results', 'clientTech', 'apiTech']
        for field in required_fields:
            if field not in data:
                response = app.response_class(
                    response=f'{{"error": "Missing required field: {field}"}}',
                    status=400,
                    mimetype='application/json'
                )
                return response
        
        db.createProject(
            data['name'],
            data['description'],
            data['requirements'],
            data['img'],
            data['results'],
            data['clientTech'],
            data['apiTech'],
            data['dbTech']
        )
        
        response = app.response_class(
            response='{"message": "Project Created"}',
            status=201,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        print(f"Error creating project: {str(e)}")
        response = app.response_class(
            response='{"error": "Internal Server Error"}',
            status=500,
            mimetype='application/json'
        )
        return response

@app.route('/project/<id>', methods=['PUT', 'DELETE', 'OPTIONS'])
def handle_project(id):
    if request.method == "OPTIONS":
        response = app.response_class(
            response='',
            status=200
        )
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
        return response
    
    elif request.method == "DELETE":
        try:
            db = ProjectDB('projects.db')
            success = db.deleteProject(id)
            
            if success:
                response_str = '{"message": "Project successfully deleted"}'
                status = 200
            else:
                response_str = '{"error": "Project not found"}'
                status = 404
                
            response = app.response_class(
                response=response_str,
                status=status,
                mimetype='application/json'
            )
            
        except Exception as e:
            response = app.response_class(
                response='{"error": "Failed to delete project"}',
                status=500,
                mimetype='application/json'
            )
            
    elif request.method == "PUT":
        try:
            data = request.json
            if not data:
                response = app.response_class(
                    response='{"error": "No JSON data received"}',
                    status=400,
                    mimetype='application/json'
                )
                return response

            required_fields = ['name', 'description', 'requirements', 'results', 'clientTech', 'apiTech']
            for field in required_fields:
                if field not in data:
                    response = app.response_class(
                        response=f'{{"error": "Missing required field: {field}"}}',
                        status=400,
                        mimetype='application/json'
                    )
                    return response

            db = ProjectDB('projects.db')
            result = db.updateProject(
                id,
                data['name'],
                data['description'],
                data['requirements'],
                data.get('img', ''),
                data['results'],
                data['clientTech'],
                data['apiTech'],
                data.get('dbTech', '')
            )
            
            response = app.response_class(
                response=f'{{"message": "{result}"}}',
                status=200,
                mimetype='application/json'
            )
            
        except Exception as e:
            print(f"Error updating project: {str(e)}")
            response = app.response_class(
                response='{"error": "Internal Server Error"}',
                status=500,
                mimetype='application/json'
            )
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/lbmnhwi', methods=['POST'])
def authenticate():
    data = request.form
    if data['password'] == 'password':
        return 'Authenticated', 200, {"Access-Control-Allow-Origin": "*"}
    return 'Unauthorized', 401, {"Access-Control-Allow-Origin": "*"}

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
    return response

@app.after_request
def after_request(response):
    return add_cors_headers(response)

def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == '__main__':
    run()