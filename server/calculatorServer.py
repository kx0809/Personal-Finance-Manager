from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Handle connection to /calculator namespace
@socketio.on('connect', namespace='/calculator')
def handle_connect_calculator():
    print('Connected to /calculator')

# Handle client messages with numbers and operation
@socketio.on('client_send', namespace='/calculator')
def handle_client_send_calculator(data):
    number1 = data['number1']
    number2 = data['number2']
    operation = data['operation']
    
    result = None
    if operation == 'add':
        result = number1 + number2
    elif operation == 'subtract':
        result = number1 - number2
    elif operation == 'multiply':
        result = number1 * number2
    elif operation == 'divide':
        if number2 != 0:
            result = number1 / number2
        else:
            result = 'Error: Division by zero'
    
    # Emit result back to the client
    emit('server_send', json.dumps({'result': result}), namespace='/calculator')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
