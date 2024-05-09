class userLogin {
    constructor(data) {
        this._id = data._id;
        this.username = data.username;
        this.email = data.email;
    }
}

module.exports = userLogin;
