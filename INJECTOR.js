// Criação do WebSocket
const socket = new WebSocket('wss://echo.websocket.org');

socket.onopen = function(event) {
    console.log('Conexão estabelecida');
};

socket.onmessage = function(event) {
    // Mensagem recebida
    let message = event.data;

    // Interceptar e substituir "hi" por "Hello"
    if (message.includes("hi")) {
        message = message.replace("hi", "Hello");
    }

    // Agora, a mensagem modificada pode ser usada
    console.log('Mensagem recebida e modificada: ', message);
};

socket.onerror = function(error) {
    console.log('Erro no WebSocket: ', error);
};

socket.onclose = function(event) {
    console.log('Conexão fechada');
};
