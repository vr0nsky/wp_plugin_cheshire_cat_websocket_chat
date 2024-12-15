(function () {
    //const WS_SERVER_URL = "wss://example.com/socket"; // Sostituisci con il tuo server WebSocket
    const WS_SERVER_URL = "wss://labwp.fr/ws/user?token=meow2";

    const elems = {
        chatBox: document.querySelector("#chat-box"),
        chatInput: document.querySelector("#chat-input"),
        sendButton: document.querySelector("#send-button"),
    };

    let socket;

    // Inizializza la connessione WebSocket
    function initWebSocket() {
        socket = new WebSocket(WS_SERVER_URL);

        socket.onopen = () => {
            addMessage("? Connessione stabilita.");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data); // Decodifica il JSON ricevuto

                // Controlla se il tipo di messaggio è "chat_token" e contiene il campo "content"
                if (data.type === "chat_token" && data.content !== undefined) {
                    //addMessage(data.content); // Aggiunge solo il contenuto alla chat
                }

                // Gestione di altri tipi di messaggi, come il messaggio finale completo
                else if (data.type === "chat" && data.content) {
                    addMessage(`?? ${data.content}`); // Stampa il messaggio completo con il prefisso ??
                }
            } catch (error) {
                console.error("Errore nel parsing del messaggio WebSocket:", error);
                addMessage("? Messaggio ricevuto non valido.");
            }
        };

        socket.onerror = (error) => {
            addMessage("? Errore nella connessione.");
            console.error("WebSocket Error:", error);
        };

        socket.onclose = () => {
            addMessage("? Connessione chiusa.");
        };
    }

    // Aggiunge un messaggio alla chat
    function addMessage(message) {
        const msgElem = document.createElement("div");
        msgElem.textContent = message;
        console.log(message);
        elems.chatBox.appendChild(msgElem);
        elems.chatBox.scrollTop = elems.chatBox.scrollHeight;
    }

    // Invia un messaggio al server
function sendMessage() {
    const message = elems.chatInput.value.trim();
    if (message && socket.readyState === WebSocket.OPEN) {
        try {
            const payload = JSON.stringify({ text: message, user_id: "user" }); // Usa 'text' invece di 'message'
            socket.send(payload);
            console.log("Inviato:", payload);
            addMessage(`?? Tu: ${message}`);
            elems.chatInput.value = "";
        } catch (error) {
            console.error("Errore nella serializzazione JSON:", error);
        }
    }
}

    // Event listener per il pulsante di invio
    elems.sendButton.addEventListener("click", sendMessage);
    elems.chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Inizializza il WebSocket al caricamento della pagina
    document.addEventListener("DOMContentLoaded", initWebSocket);
})();
