from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/feedback', methods=['POST'])
def feedback():
    # Parse JSON data from the client
    data = request.get_json()
    
    # Extract feedback fields from the received data
    rating = data.get('rating')
    feedbackType = data.get('feedbackType')
    comment = data.get('comment')
    recommendation = data.get('recommendation')

    # Print feedback details to the console for logging purposes
    print(f"Feedback received: rating={rating}, feedbackType={feedbackType}, comment={comment}, recommendation={recommendation}")

    # Respond with a success message
    return jsonify({"status": "success"})

if __name__ == '__main__':
    # Start the Flask app, accessible to all network interfaces at port 5000
    app.run(host='0.0.0.0', port=5000)
