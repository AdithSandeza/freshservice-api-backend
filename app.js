const Hapi = require('@hapi/hapi');

let routes = require('./routes/freshserviceRoutes')

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

require('./authscheme/authvalidate')


const init = async ()=>{
    const server = Hapi.server({
         host:'localhost',
         port:'3002',
         load: { sampleInterval: 1000 } });

    const swaggerOptions = {
            info: {
                title: 'Freshservice',
                version: "1.0.0"
    
            },
            grouping: 'tags'
        };
    

    await server.register([
        Inert,
        Vision,
         
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },

    ]
      
    )

    server.auth.scheme('passThrough',passThroughScheme);
    server.auth.strategy('passThrough', 'passThrough');
    server.auth.default('passThrough')

    server.route(routes)

    await server.start()


    console.log(`Server Running On ${server.info.uri}`)





    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });



}




init()

