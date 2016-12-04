class User {
    constructor(properties) {
        this.username = properties.username;
        this.firstName = properties.firstName;
        this.lastname = properties.lastName;
        this.email = properties.email;
        this.city = properties.city;
    }

    save() {}
    static find() {}
    static findOne() {}
}

module.exports = User;