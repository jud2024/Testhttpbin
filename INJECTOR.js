// Guarda a referência original do WebSocket
const OriginalWebSocket = window.WebSocket;

// Sobrescreve a função WebSocket
window.WebSocket = function(url, protocols) {
    console.log("Interceptando WebSocket:", url);

    // Cria a conexão original
    const socket = new OriginalWebSocket(url, protocols);

    // Intercepta o método send para modificar mensagens
    const originalSend = socket.send;
    socket.send = function(data) {
        try {
            // Tenta converter a mensagem em JSON para editar
            let parsedData = JSON.parse(data);

            // Modifica o campo "email"
            if (parsedData.email) {
                console.log("Email original:", parsedData.email);
                parsedData.email = "novo-email@example.com"; // Alteração desejada
                console.log("Email modificado:", parsedData.email);
            }

            // Reenvia a mensagem modificada
            data = JSON.stringify(parsedData);
        } catch (err) {
            console.warn("Não foi possível modificar a mensagem:", err);
        }

        originalSend.call(socket, data);
    };

    // Loga as mensagens recebidas
    socket.addEventListener('message', (event) => {
        console.log("Mensagem recebida:", event.data);
    });

    return socket;
};

// Teste abrindo uma conexão ao WebSocket
const socket = new WebSocket("wss://echo.websocket.org");

socket.addEventListener('open', () => {
    console.log("Conectado ao WebSocket!");

    // Envia uma mensagem de teste com o campo "email"
    const mensagem = JSON.stringify({
        email: "{{$internet.email}}"
    });

    socket.send(mensagem);
});
