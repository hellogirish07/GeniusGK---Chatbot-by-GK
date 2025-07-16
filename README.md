# GeniusGK Chatbot

GeniusGK is a web-based chatbot powered by Google's Gemini API, built with Flask for the backend and a modern, interactive frontend. It supports code formatting, copy-to-clipboard for code blocks, idle detection with fun messages, and a sleek UI.

## Features

- **Conversational AI**: Chat with GeniusGK, powered by Gemini.
- **Code Formatting**: Replies with code are copyable.
- **Idle Detection**: Fun idle messages if the user is inactive.
- **Responsive UI**: Modern, mobile-friendly chat interface.
- **Copy Button**: Easily copy code snippets from bot replies.

## Project Structure

```
app.py
static/
    script.js
    style.css
templates/
    index.html
```

- `app.py`: Flask backend, handles chat and serves the frontend.
- `static/script.js`: Frontend logic (chat, idle detection, code copy).
- `static/style.css`: Custom styles for the chat UI.
- `templates/index.html`: Main HTML template.

## Setup & Usage

### Prerequisites

- Python 3.8+
- [Flask](https://flask.palletsprojects.com/)
- [google-generativeai](https://pypi.org/project/google-generativeai/)

### Installation

1. **Clone the repository** (or copy the files):

2. **Install dependencies**:
    ```sh
    pip install flask google-generativeai
    ```

3. **Set up your Gemini API key**:
    - The API key is set in `app.py` as `API_KEY`. Replace it with your own if needed.

4. **Run the app**:
    ```sh
    python app.py
    ```

5. **Open in browser**:
    - Visit [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Customization

- **Idle Messages**: Edit the `idleMessages` array in [`static/script.js`](static/script.js).
- **Styling**: Modify [`static/style.css`](static/style.css) for custom themes.
- **Bot Name**: Change "GeniusGK" in the HTML/JS for a different persona.

## Security Note

- **API Key**: Do **not** expose your Gemini API key in production. Use environment variables or a secure backend.

## License

This project is for educational purposes.

---

Made with ❤️ by Girish (GeniusGK)

GitHub - @hellogirish07

Instagram - @gk.suthar1