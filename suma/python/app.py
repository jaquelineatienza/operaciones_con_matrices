from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

matriz1 = []
matriz2 = []

@app.route('/cargarMatrices', methods=['POST'])
def cargar_matrices():
    global matriz1, matriz2
    data = request.get_json()
    matriz1 = data.get('matriz1')
    matriz2 = data.get('matriz2')

    if not matriz1 or not matriz2:
        return jsonify({"error": "Faltan matrices"}), 400

    if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
        return jsonify({"error": "Las matrices deben tener las mismas dimensiones"}), 400

    return jsonify({"mensaje": "Matrices recibidas correctamente"}), 200

@app.route('/resultado', methods=['GET'])
def resultado():
    if not matriz1 or not matriz2:
        return jsonify({"error": "No hay matrices cargadas aún"}), 400

    resultado = []
    for i in range(len(matriz1)):
        fila = []
        for j in range(len(matriz1[0])):
            fila.append(matriz1[i][j] + matriz2[i][j])
        resultado.append(fila)

    return jsonify({"resultado": resultado})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
