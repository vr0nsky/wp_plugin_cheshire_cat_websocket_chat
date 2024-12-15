<?php
/*
Plugin Name: WebSocket Chat
Description: Un plugin per creare una chat tramite WebSocket usando uno shortcode [websocket_chat].
Version: 1.0
Author: Pippo lo Sdentato
*/

// Carica i file JavaScript e CSS
function load_websocket_chat_assets() {
    wp_enqueue_style('websocket-chat-css', plugins_url('css/chat.css', __FILE__));
    wp_enqueue_script('websocket-chat-js', plugins_url('js/chat.js', __FILE__), [], null, true);
}
add_action('wp_enqueue_scripts', 'load_websocket_chat_assets');

// Crea lo shortcode per la chat
function render_websocket_chat() {
    ob_start();
    ?>
    <div id="websocket-chat-container">
        <div id="chat-box"></div>
        <input type="text" id="chat-input" placeholder="Scrivi un messaggio..." />
        <button id="send-button">Invia</button>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('websocket_chat', 'render_websocket_chat');
