from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')  # We'll create this file next

@app.route('/api/buildings')
def buildings():
    # Example data: Replace this with a query from your database or data file
    buildings_data = [
        {'id': 1, 'latitude': 41.8781, 'longitude': -87.6298, 'eui': 150, 'ghgIntensity': 0.3},
        {'id': 2, 'latitude': 41.8819, 'longitude': -87.6278, 'eui': 200, 'ghgIntensity': 0.5}
    ]
    return jsonify(buildings_data)

if __name__ == '__main__':
    app.run()
