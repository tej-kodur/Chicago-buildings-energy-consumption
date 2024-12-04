from flask import Flask, render_template, jsonify
import pandas as pd
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')  # We'll create this file next


@app.route('/api/data')
def get_data():
    df = pd.read_csv('data/chicago_buildings.csv')
    # Convert DataFrame to JSON
    buildings_data = df.to_dict(orient='records')
    return jsonify(buildings_data)


@app.route('/api/sample_data')
def sample_data():
    # Example data: Replace this with a query from your database or data file
    sample_data = [
        {'id': 1, 'latitude': 41.8781, 'longitude': -87.6298, 'eui': 150, 'ghgIntensity': 0.3},
        {'id': 2, 'latitude': 41.8819, 'longitude': -87.6278, 'eui': 200, 'ghgIntensity': 0.5}
    ]
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run()
