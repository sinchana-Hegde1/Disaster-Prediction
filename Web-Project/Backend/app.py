import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

earthquake_model = joblib.load(os.path.join(BASE_DIR, 'earthquake_model.pkl'))
flood_model = joblib.load(os.path.join(BASE_DIR, 'flood_model.pkl'))
forest_fire_model = joblib.load(os.path.join(BASE_DIR, 'forest_fire_model.pkl'))
forest_fire_encoder = joblib.load(os.path.join(BASE_DIR, 'one_hot_encoder.pkl'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        model_type = data.get('model_type')

        if model_type == 'earthquake':
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            depth = data.get('depth')

            if latitude is None or longitude is None or depth is None:
                return jsonify({'error': 'Missing input data for earthquake model. Provide latitude, longitude, and depth.'}), 400

            features = [[latitude, longitude, depth]]
            prediction = earthquake_model.predict(features)
            return jsonify({'model_type': 'earthquake', 'predicted_magnitude': prediction[0]})

        elif model_type == 'flood':
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            rainfall_mm = data.get('rainfall_mm')
            elevation_m = data.get('elevation_m')
            river_discharge = data.get('river_discharge_m3_s')

            if latitude is None or longitude is None or rainfall_mm is None or elevation_m is None or river_discharge is None:
                return jsonify({'error': 'Missing input data for flood model. Provide latitude, longitude, rainfall_mm, elevation_m, and river_discharge_m3_s.'}), 400

            features = [[latitude, longitude, rainfall_mm, elevation_m, river_discharge]]
            prediction = flood_model.predict(features)
            return jsonify({'model_type': 'flood', 'predicted_flood_risk': prediction[0]})

        elif model_type == 'forestfire':
            state = data.get('state')

            if state is None:
                return jsonify({'error': 'Missing input data for forest fire model. Provide state.'}), 400

            state_data = pd.DataFrame({'State/UT': [state]})
            encoded_state = forest_fire_encoder.transform(state_data)
            prediction = forest_fire_model.predict(encoded_state)

            risk_levels = ['Low', 'Medium', 'High']
            predicted_risk = risk_levels[int(prediction[0])]

            return jsonify({'model_type': 'forestfire', 'predicted_risk_level': predicted_risk})

        else:
            return jsonify({'error': 'Invalid model_type. Must be "earthquake", "flood", or "forestfire".'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
