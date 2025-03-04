from flask import Flask, jsonify
import requests
import pdb  # Importa o depurador

app = Flask(__name__)

@app.route('/test-httpbin', methods=['GET'])
def test_httpbin():
    url = "https://httpbin.org/get"
    params = {"nome": "Judson", "mensagem": "Olá, HTTPbin!"}
    
    # Ativa o depurador interativo aqui
    pdb.set_trace()

    # Faz a requisição GET para o httpbin
    response = requests.get(url, params=params)
    
    # Retorna a resposta para o navegador
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
