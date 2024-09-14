from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  

# Handle connection to /calculator namespace
@socketio.on('connect', namespace='/calculator')
def handle_connect_calculator():
    print('Connected to /calculator')

@socketio.on('client_send', namespace='/calculator') 
def handle_client_send_calculator(data): 
    try: 
        // Extract the numbers and operation from the incoming data
        number1 = data['number1'] 
        number2 = data['number2'] 
        operation = data['operation'] 
        
        // Initialize result variable to store the calculation result
        result = None 
        
        // Perform the appropriate operation based on the 'operation' field
        if operation == 'add': 
            result = number1 + number2 
        elif operation == 'subtract': 
            result = number1 - number2 
        elif operation == 'multiply': 
            result = number1 * number2 
        elif operation == 'divide': 
            if number2 != 0: 
                // Perform division if the second number is not zero
                result = number1 / number2 
            else: 
                // Handle division by zero error
                result = 'Error: Division by zero' 

        // Send the result back to the client as a JSON object
        emit('server_send', json.dumps({'result': result}), namespace='/calculator') 

    except Exception as e: 
        // Handle any unexpected errors by sending a generic error message to the client
        emit('server_send', json.dumps({'result': 'Error'}), namespace='/calculator') 

# Start the server
if __name__ == '__main__': 
    socketio.run(app, host='0.0.0.0', port=5001) 