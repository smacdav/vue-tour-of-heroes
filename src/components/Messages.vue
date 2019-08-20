<template>
    <div v-if="messageService.messages.length">
        <h2>Messages</h2>
        <button class="clear"
                @click="messageService.clear()">clear</button>
        <div v-for="message in messageService.messages"> {{message}} </div>
    </div>
</template>

<script>
    import MessageService from "@/services/MessageService";
    export default {
        name: "Messages",
        data() {
            return {
                messageService: MessageService.instance()
            };
        }
    }
</script>

<style scoped>
    /* MessagesComponent's private CSS styles */
    h2 {
        color: red;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: lighter;
    }
    body {
        margin: 2em;
    }
    body, input[text], button {
        color: crimson;
        font-family: Cambria, Georgia;
    }

    button.clear {
        font-family: Arial;
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        cursor: hand;
    }
    button:hover {
        background-color: #cfd8dc;
    }
    button:disabled {
        background-color: #eee;
        color: #aaa;
        cursor: auto;
    }
    button.clear {
        color: #333;
        margin-bottom: 12px;
    }
</style>
