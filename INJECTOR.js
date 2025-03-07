// Guarda a referência original do WebSocket
const OriginalWebSocket = window.WebSocket;

// Sobrescreve a função WebSocket
window.WebSocket = function(url, protocols) {
    console.log("Interceptando WebSocket:", url);

    // Cria a conexão original
    const socket = new OriginalWebSocket(url, protocols);

    socket.addEventListener('open', () => {
        console.log("WebSocket conectado:", url);

        // Intercepta o método send para modificar mensagens
        const originalSend = socket.send;
        socket.send = function(data) {
            try {
                // Só tenta modificar mensagens se forem JSON válidos
                if (typeof data === "string") {
                    const parsedData = JSON.parse(data);

                    if (parsedData.email) {
                        console.log("Email original:", parsedData.email);
                        parsedData.email = "novo-email@example.com";
                        console.log("Email modificado:", parsedData.email);
                    }

                    data = JSON.stringify(parsedData);
                }
            } catch (err) {
                console.warn("Mensagem enviada não é um JSON válido:", data);
            }

            originalSend.call(socket, data);
        };

        // Loga as mensagens recebidas
        socket.addEventListener('message', (event) => {
            try {
                const parsedMessage = JSON.parse(event.data);
                console.log("Mensagem JSON recebida:", parsedMessage);
            } catch (err) {
                console.log("Mensagem recebida (não JSON):", event.data);
            }
        });
    });

    return socket;
};

// Teste: cria uma conexão WebSocket
const socket = new WebSocket("wss://echo.websocket.org");

socket.addEventListener('open', () => {
    console.log("Conectado ao WebSocket!");

    // Envia uma mensagem JSON
    socket.send(JSON.stringify({ email: "teste@email.com" }));

    // Envia uma mensagem de texto simples (não JSON)
    socket.send("Mensagem simples de teste");
});
