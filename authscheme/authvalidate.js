


passThroughScheme = function(server, options){
    return {
        authenticate : async function (request, h) {
            return h.authenticated({credentials: {user: request.url.path}});


        }
    }
};
module.exports = passThroughScheme;