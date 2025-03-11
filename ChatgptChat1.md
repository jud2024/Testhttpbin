Ótimo ponto! Se você quer usar o mitmproxy diretamente ao lado do servidor — ou seja, interceptando o tráfego antes que ele chegue ao cliente — podemos configurar o modo reverso. Isso é útil para modificar respostas antes que elas sejam enviadas ao navegador ou outra aplicação. Vou te guiar!


---

🚀 1. Configurar o mitmproxy no modo reverso

O modo reverso faz o mitmproxy agir como um proxy inverso, recebendo requisições dos clientes, modificando-as, e encaminhando ao servidor real.

Passos:

1. Rodar o mitmproxy em modo reverso:

Suponha que seu servidor está rodando em http://localhost:5000:




mitmproxy --mode reverse:http://localhost:5000 -s modify_html.py

2. Apontar o tráfego para o mitmproxy:

Configure o aplicativo ou navegador para acessar o mitmproxy, por exemplo:

Se seu mitmproxy estiver rodando em localhost:8080, acesse pelo navegador:




http://localhost:8080

Agora, todas as requisições passarão pelo mitmproxy antes de chegar ao servidor real.


---

🛠️ 2. Modificar a resposta HTML

Aqui está um exemplo básico para modificar conteúdo vindo do servidor antes de ser enviado ao cliente.

modify_html.py:

from mitmproxy import http

def response(flow: http.HTTPFlow):
    # Verifica se a resposta é HTML
    if "text/html" in flow.response.headers.get("Content-Type", ""):
        html = flow.response.content.decode('utf-8')
        
        # Modifica conteúdo da página
        html_modificado = html.replace("Texto Original", "Texto Modificado")
        
        # Atualiza a resposta
        flow.response.content = html_modificado.encode('utf-8')
        print("Conteúdo HTML modificado antes de chegar ao cliente.")


---

🔥 3. Testar

Servidor real: rodando em http://localhost:5000

Proxy reverso (mitmproxy): rodando em http://localhost:8080

Cliente: acessando o proxy em http://localhost:8080


Você verá a página com o conteúdo modificado!


---

🌐 4. HTTPS (opcional)

Se o servidor usar HTTPS:

1. Rode o mitmproxy com suporte a TLS:



mitmproxy --mode reverse:https://seu-servidor.com -s modify_html.py

2. Instale o certificado do mitmproxy acessando:
http://mitm.it




---

Esse fluxo permite que você altere conteúdo dinâmico antes que ele chegue ao usuário, perfeito para testes, pentesting, ou depuração avançada. Quer ajustar algo mais específico, como WebSockets ou APIs? Me diz o que você tá tramando!

