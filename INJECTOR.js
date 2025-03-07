// Guarda a referência original do WebSocket
const OriginalWebSocket = window.WebSocket;

// Sobrescreve a função WebSocket
window.WebSocket = function (url, protocols) {
    console.log("Interceptando WebSocket:", url);

    const socket = new OriginalWebSocket(url, protocols);

    socket.addEventListener('open', () => {
        console.log("WebSocket conectado:", url);

        // Intercepta o método send
        const originalSend = socket.send;
        socket.send = function (data) {
            try {
                if (typeof data === "string") {
                    const parsedData = JSON.parse(data);

                    // Verifica se a mensagem enviada contém um campo de email
                    if (parsedData.email) {
                        console.log("Email original enviado:", parsedData.email);
                        parsedData.email = "novo-email@example.com"; // Modifica o email
                        console.log("Email modificado enviado:", parsedData.email);
                    }

                    // Envia novamente a mensagem modificada
                    data = JSON.stringify(parsedData);
                }
            } catch (err) {
                console.warn("Mensagem enviada não é um JSON válido:", data);
            }

            originalSend.call(socket, data);
        };

        // Intercepta mensagens recebidas
        socket.addEventListener('message', (event) => {
            let rawData = event.data;

            try {
                // Tenta limpar mensagens JSON corrompidas (caso existam)
                const cleanData = rawData.trim().replace(/}\s*$/, "}");

                // Tenta converter para JSON
                const parsedMessage = JSON.parse(cleanData);

                // Verifica se a resposta contém um email e modifica o valor
                if (parsedMessage.email) {
                    console.log("Email original recebido:", parsedMessage.email);
                    parsedMessage.email = "novo-email-recebido@example.com"; // Modifica o email recebido
                    console.log("Email modificado na resposta:", parsedMessage.email);
                }

                // Aqui você pode modificar a resposta antes de passar para o resto do código da página
                event.data = JSON.stringify(parsedMessage);

            } catch (err) {
                console.warn("Mensagem recebida não é um JSON válido:", rawData);
            }
        });
    });

    return socket;
};

// Teste: cria uma conexão WebSocket
const socket = new WebSocket("wss://echo.websocket.org");

socket.addEventListener('open', () => {
    console.log("Conectado ao WebSocket!");

    // Envia uma mensagem JSON com o campo email
    socket.send(JSON.stringify({ email: "teste@email.com" }));

    // Envia uma mensagem simples de texto (não JSON)
    socket.send("Mensagem simples de teste");

    // Simula uma resposta com email
    socket.send('{"email": "Lucinda.Hills8@hotmail.com"} }');
});
