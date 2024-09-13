from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    rating = data.get('rating')
    feedbackType = data.get('feedbackType')
    comment = data.get('comment')
    recommendation = data.get('recommendation')

    print(f"Feedback received: rating={rating}, feedbackType={feedbackType}, comment={comment}, recommendation={recommendation}")

    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
