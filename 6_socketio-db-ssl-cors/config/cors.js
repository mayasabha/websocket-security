const corsOptions = {
    origins: ["juntanet.apoorvpal.in", "jn.apoorvpal.in"],
    /*handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true,
        });
    },*/
    //credentials: true,
};

module.exports = corsOptions;