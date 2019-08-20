class MessageService {
    messages = [];
    static service;

    static instance() {
        if (!MessageService.service) {
            MessageService.service = new MessageService();
        }
        return MessageService.service;
    }

    add(message) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}

export default MessageService;
