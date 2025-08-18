from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

# Configure Gemini
API_KEY = "AIzaSyC1Bb-IoGg30dUVYqo1sg4qdOXm1B1ncfU"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")
chat_session = model.start_chat()
    
# Flask setup
app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('laning-page.html')

@app.route('/chat')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    try:
        response = chat_session.send_message(user_message)
        reply = response.candidates[0].content.parts[0].text.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
