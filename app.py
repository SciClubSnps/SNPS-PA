from flask import Flask, request, jsonify
import serial

app = Flask(__name__)

# Initialize the serial connection (adjust COM port and baud rate if necessary)
arduino = serial.Serial(port='COM4', baudrate=9600, timeout=1)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    message = data.get('message', '')

    if message:
        arduino.write((message + '\n').encode())  # Send the message followed by a newline
        return jsonify({"status": "success", "message": message}), 200
    else:
        return jsonify({"status": "error", "message": "Message cannot be empty!"}), 400

@app.teardown_appcontext
def close_serial_connection(exception):
    arduino.close()

if __name__ == '__main__':
    app.run(debug=True)
