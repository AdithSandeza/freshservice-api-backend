const Joi = require('joi');
const freshserviceHandler = require('../handlers/freshserviceHandlers');

const freshServiceIntegration = [
   
    {
        method: 'GET',
        path: '/arta/v1/freshservice/tickets/{apiKey}/{domainName}',
    
        handler: freshserviceHandler.getTickets,
        options : {
            tags: ["api","Freshservice Integration"],
            cors: {
                origin: ['*'],
                credentials: true
            },
            validate: {
               
                params: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name")

                }).label("Tickets")
            },
            auth : {
                strategy : 'passThrough'
            },

        }
    },
  
        {
        path : '/arta/v1/freshservice/contactlist/{apiKey}/{domainName}',
        method: 'GET',
        handler: freshserviceHandler.freshserviceContactList,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
            validate: {
                params: Joi.object({
                    apiKey: Joi.string().required().description("ApiKey"),
                    domainName:Joi.string().required().description("Domain Name")
                    
                }).label("ApiKey and Domain")
            },
                auth:{
                    strategy:'passThrough'
            }
        }

    },
    {
        path : '/arta/v1/freshservice/phonecontacts/{apiKey}/{domainName}',
        method: 'GET',
        handler: freshserviceHandler.freshservicePhoneContacts,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
            validate: {
                params: Joi.object({
                    apiKey: Joi.string().required().description("ApiKey"),
                    domainName:Joi.string().required().description("Domain Name")
                }).label("clientId")
            },
                auth:{
                    strategy:'passThrough'
            }
        }

    },
    {
        path : '/arta/v1/freshservice/createticket',
        method: 'POST',
        handler: freshserviceHandler.freshserviceCreateTicket,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough'
            },
            validate: {

                payload: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    name:Joi.string().required().description("Requesters Name"),
                    requesterId :Joi.number(),
                    phoneNumber:Joi.string().required().description("Requesters Phone Number"),

                }).label("create ticket")
            },
            response: {
                status: {
                    200 : Joi.object({
                        "statusCode":Joi.number(),
                        "ticketId":Joi.number()
                    }).label('Result'),
                    409 : Joi.object({
                        "statusCode": Joi.number(),
                        "error": Joi.string(),
                        "message": Joi.string()
                    })
                }
            }
        }

    },
    {
        path : '/arta/v1/freshservice/addnote',
        method: 'POST',
        handler: freshserviceHandler.freshserviceCreateNote,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough'
            },
            validate: {

                payload: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    ticketId:Joi.number().required().description("Ticket Id"),
                    description:Joi.string().required().description("Note Description"),

                }).label("add note")
            },
            response: {
                status: {
                    200 : Joi.object({
                        "statusCode":Joi.number(),
                        "noteId":Joi.number()
                    }).label('Result'),
                    409 : Joi.object({
                        "statusCode": Joi.number(),
                        "error": Joi.string(),
                        "message": Joi.string()
                    })
                }
            }
        }

    },
    {
        path : '/arta/v1/freshservice/searchuser/phonenumber/{apiKey}/{domainName}/{phonenumber}',
        method: 'GET',
        handler: freshserviceHandler.freshserviceSearchUserByNumber,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough'
            },
            validate: {

                params: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    phonenumber:Joi.string().required().description("Customers Number"),

                }).label("search user")
            },
          
        }

    },
    {
        path : '/arta/v1/freshservice/listusertickets/{apiKey}/{domainName}/{requesterid}',
        method: 'GET',
        handler: freshserviceHandler.freshserviceCallerTickets,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough'
            },
            validate: {

                params: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    requesterid:Joi.string().required().description("Requester Id"),

                }).label("list user tickets")
            },
          
        }

    },
    {
        path : '/arta/v1/freshservice/addendcallnote',
        method: 'POST',
        handler: freshserviceHandler.freshserviceAddEndCallNote,
        options:{
            tags: ["api","Freshservice Integration"],
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough'
            },
            validate: {

                payload: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    ticketId:Joi.number().required().description("Ticket Id"),
                    connectContactId:Joi.string().required().description("Amazon Connect Contact Id"),
                    connectInstanceUrl:Joi.string().required().description("Amazon Connect Instance URL"),
                    connectAgentHandled:Joi.string().required().description("Amazon Connect Agent Handled")

                }).label("add note")
            },
            response: {
                status: {
                    200 : Joi.object({
                        "statusCode":Joi.number(),
                        "noteId":Joi.number()
                    }).label('Result'),
                    409 : Joi.object({
                        "statusCode": Joi.number(),
                        "error": Joi.string(),
                        "message": Joi.string()
                    })
                }
            }
        }

    },
    {
        path : '/arta/v1/freshservice/createrequester',
        method: 'POST',
        handler: freshserviceHandler.freshserviceNewRequester,
        options:{
            tags: ["api","Freshservice Integration"],
         
            cors:{
                origin : ['*'],
                credentials: true
            },
     
                auth:{
                    strategy:'passThrough',
                
            },
            validate: {

                payload: Joi.object({
                    apiKey: Joi.string().required().description("Api Key"),
                    domainName:Joi.string().required().description("Domain Name"),
                    firstName:Joi.string().required().description("Requesters First Name"),
                    lastName:Joi.string().required().description("Requesters Last Name"),
                    phoneNumber:Joi.string().required().description("Requesters Work Phone Number"),

                }).label("create ticket")
            },
            response: {
                status: {
                    200 : Joi.object({
                        "statusCode":Joi.number(),
                        "requesterId":Joi.number(),
                        "workPhoneNumber":Joi.string(),
                        "firstName":Joi.string(),
                        "lastName":Joi.string()
                    }).label('Result'),
                    409 : Joi.object({
                        "statusCode": Joi.number(),
                        "error": Joi.string(),
                        "message": Joi.string()
                    })
                }
            }
        }
    }

]

module.exports = freshServiceIntegration;
