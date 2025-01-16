from flask import Flask, request, jsonify
import util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'location': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@app.route('/predict_home_price',methods=['POST'])
# def predict_home_price():
#     try:
#
#         print("Request data:", request.json)
#
#         data = request.json  # Parse JSON data
#         total_sqft = float(data['SQFT'])
#         location = data['AREA']
#         bedroom = float(data['BEDROOM'])
#         bathroom = float(data['BATHROOM'])
#
#         response = jsonify({
#             'estimated_price': util.get_estimated_price(location, total_sqft, bedroom, bathroom)
#         })
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response
#
#     except Exception as e:
#         print(f"Error occurred: {e}")
#         return jsonify({'error': 'Bad Request', 'details': str(e)}), 400

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        data = request.json  # Parse JSON data
        print("Received data:", data)

        # Validate all required fields
        required_fields = ['SQFT', 'AREA', 'BEDROOM', 'BATHROOM']
        for field in required_fields:
            if field not in data:
                raise KeyError(f"Missing required field: {field}")

        # Extract and process data
        total_sqft = float(data['SQFT'])
        location = data['AREA']
        bedroom = float(data['BEDROOM'])
        bathroom = float(data['BATHROOM'])

        # Predict price
        estimated_price = util.get_estimated_price(location, total_sqft, bedroom, bathroom)

        # Return response
        return jsonify({'estimated_price': estimated_price})

    except KeyError as e:
        print(f"Missing key: {e}")
        return jsonify({'error': 'Bad Request', 'details': str(e)}), 400

    except ValueError as e:
        print(f"Invalid data type: {e}")
        return jsonify({'error': 'Bad Request', 'details': str(e)}), 400

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500


if __name__== '__main__':
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)