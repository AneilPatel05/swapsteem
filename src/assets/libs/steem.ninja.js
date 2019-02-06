class SteemNinja {
    constructor(api_key, referrer) {
        if (typeof api_key !== "string") {
            throw new TypeError("api_key must be a string. " + (typeof api_key) + " given.");
        }
        if (api_key.length === 0) {
            throw new RangeError("the length of the api_key may not be 0")
        }
        if (typeof referrer !== "string") {
            throw new TypeError("referrer must be a string. " + (typeof referrer) + " given.");
        }
        if (referrer.length === 0) {
            throw new RangeError("the length of the referrer may not be 0")
        }

        this.api_key = api_key;
        this.referrer = referrer;
        this.host = "https://pay.steem.ninja";
        this.redirect_success = null;
        this.redirect_failure = null;

        console.log("Thanks for using Steem.Ninja!")
    }

    setAPIHost(host) {
        if (typeof host !== "string") {
            throw new TypeError("host must be a string. " + (typeof host) + " given.");
        }
        if (host.length === 0) {
            throw new RangeError("the length of the host may not be 0")
        }
        this.host = host;
    }

    setRedirectSuccessUrl(url) {
        if (typeof url !== "string") {
            throw new TypeError("url must be a string. " + (typeof url) + " given.");
        }
        if (url.length === 0 || !url.startsWith("http")) {
            throw new RangeError("the length of the url may not be 0 and must start with http")
        }
        this.redirect_success = url;
    }

    setRedirectFailureUrl(url) {
        if (typeof url !== "string") {
            throw new TypeError("url must be a string. " + (typeof url) + " given.");
        }
        if (url.length === 0 || !url.startsWith("http")) {
            throw new RangeError("the length of the url may not be 0 and must start with http")
        }
        this.redirect_failure = url;
    }


    async requestToken(sku, new_account_name, price) {
        if (price < 250) {
            throw new RangeError("price may not be lower than 250");
        }
        return new Promise((resolve, reject) => {
            if (this.redirect_success === null || this.redirect_failure === null) {
                throw new TypeError("redirect_success and redirect_failure may not be null")
            } else {
                let url = this.host + "/api/token?api_key=" + this.api_key;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    sku: sku,
                    json_metadata: {
                        account: new_account_name,
                        referrer: this.referrer,
                        redirect_success: this.redirect_success,
                        redirect_failure: this.redirect_failure,
                        price
                    }
                }));

                xhr.onreadystatechange = function () {
                    if (this.readyState !== 4) return;
                    let data = JSON.parse(this.responseText);
                    if (this.status === 200) {
                        resolve(data)
                    } else {
                        reject(data)
                    }
                };
            }
        });
    }
}

