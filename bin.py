import requests
import pdb

# URL do HTTPbin
url = "https://httpbin.org/get"

# Parâmetros da requisição
params = {"nome": "Judson", "mensagem": "Olá, HTTPbin!"}

# Ativar o debugger antes de enviar a requisição
pdb.set_trace()

# Enviar a requisição GET com os parâmetros
response = requests.get(url, params=params)

# Interceptar a resposta
print("Status Code:", response.status_code)
print("Resposta JSON:", response.json())
