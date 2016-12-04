class Message {
    constructor(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.address = properties.address;
        this.title = properties.title;
        this.content = properties.content;
        this.processedBy = properties.processedBy;
        this.sendOn = properties.sendOn;
    }

    create() {}
    static find() {}
    static findOne() {}
}

module.exports = Message;