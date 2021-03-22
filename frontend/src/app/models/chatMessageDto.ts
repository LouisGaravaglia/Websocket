export class ChatMessageDto {
    user: string;
    message: string;
    type: string;

    constructor(user: string, message: string, type: string) {
        this.user = user;
        this.message = message;
        this.type = type;
    }
}