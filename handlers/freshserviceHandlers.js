const Boom = require('boom');
const httpClient = require('axios').default;
require('dotenv').config();
var urlencode = require('urlencode');


class FreshserviceHandler {



    async getTickets(request, h){
        try{ 
          
      
            let domainName = request.params.domainName;
            let apiKey = request.params.apiKey;

              
            
             
    const client = httpClient.create({auth: {
         username: apiKey,
         password: 'X',
      },
      headers: {
        "Content-Type": "application/json"
    }});
    var myDate = new Date();
    var dueTodayDate;

    var overDueDate =  myDate.getFullYear()+'-'+('0' + (myDate.getMonth()+1)).slice(-2)+'-'+('0' + (myDate.getDate()-7)).slice(-2) ;


    dueTodayDate = myDate.getFullYear()+'-'+('0' + (myDate.getMonth()+1)).slice(-2)+'-'+('0' + myDate.getDate()).slice(-2) ;
  

    let open = await client.get(`${domainName}/api/v2/tickets/filter?query="status:2"`)
    let pending = await client.get(`${domainName}/api/v2/tickets/filter?query="status:3"`)
    let resolved = await client.get(`${domainName}/api/v2/tickets/filter?query="status:4"`)
    let closed = await client.get(`${domainName}/api/v2/tickets/filter?query="status:5"`)
    let overdue = await client.get(`${domainName}/api/v2/tickets/filter?query="due_by:< '${overDueDate}' AND status:2 "`)
    let dueToday = await client.get(`${domainName}/api/v2/tickets/filter?query="due_by:'${dueTodayDate}'"`)
    // let onhold = await client.get(`${domainName}/api/v2/tickets/filter?query="status:6%20OR%20status:3"`)
    let unasignedTickets = await client.get(`${domainName}/api/v2/tickets/filter?query="agent_id:null AND ( status:2 OR status:3 OR status:4 OR status:5 )"`)
    let unresolved = await client.get(`${domainName}/api/v2/tickets/filter?query="status:2 OR status:3 OR status:5"`)         

    return {
         Open:open.data.total,          
         Pending:pending.data.total,
         Resolved:resolved.data.total,
         Closed:closed.data.total,
         Overdue:overdue.data.total,
         Duetoday:dueToday.data.total,
        //  onhold: onhold.data.total,
         Unassigned: unasignedTickets.data.total,
         Unresolved: unresolved.data.total
        }


 

        }catch(e){
            console.log(e)
            return Boom.badData("{ }",null);
        }
     }
 


    
    async freshserviceContactList(request){
 
        let domainName = request.params.domainName;
        let apiKey = request.params.apiKey;
          
        
         
        const client = httpClient.create({auth: {
            username: apiKey,
            password: 'X',
        },
        headers: {
            "Content-Type": "application/json"
        }});

        let contactList = await client.get(`${domainName}/api/v2/requesters`)

        let passData = []

        contactList.data.requesters.filter((data)=>{

        if(data.mobile_phone_number!=null || data.work_phone_number!=null){
            passData.push(new Object({"firstName":data.first_name,
            "lastName":data.last_name,
            "displayName":data.first_name+' '+data.last_name,
            "requesterId":data.id,
            "activeAccount":data.active,
            "primaryEmail":data.primaryEmail,
            "phoneNumber":data.mobile_phone_number != null?data.mobile_phone_number:data.work_phone_number,
            "address":data.address,
            "language":data.language,
            "externalId":data.external_id,
            "reportingManagerId":data.reporting_manager_id,
            "isAgent":data.is_agent,

        }))

            
        }
            
      

            
        })

        return passData;


    }

    async freshservicePhoneContacts(request){

        let domainName = request.params.domainName;
        let apiKey = request.params.apiKey;
          
        
         
        const client = httpClient.create({auth: {
            username: apiKey,
            password: 'X',
        },
        headers: {
            "Content-Type": "application/json"
        }});

        let contactList = await client.get(`${domainName}/api/v2/requesters`)

        let passData = []

        contactList.data.requesters.filter((data)=>{

            if(data.mobile_phone_number!=null || data.work_phone_number!=null){

                passData.push(new Object({"firstName":data.first_name,
                "lastName":data.last_name,
                "displayName":data.first_name+' '+data.last_name,
                "requesterId":data.id,
                "activeAccount":data.active,
                "primaryEmail":data.primaryEmail,
                "mobilePhoneNumber":data.mobile_phone_number,
                "workPhoneNumber":data.work_phone_number,
                "address":data.address,
                "language":data.language,
                "externalId":data.external_id,
                "reportingManagerId":data.reporting_manager_id,
                "isAgent":data.is_agent,

            }))


            }
            
 

            
        })

        return passData;

    }

    async freshserviceCreateTicket(request){



        try{
        let data
        let req = request.payload;
        let domainName = req.domainName;
        let apiKey = req.apiKey;

        if(req.requesterId!=0){
            
           data = {
            "name": req.name,
            "phone":req.phoneNumber,
            "subject":"From"+req.phoneNumber+"/Amazon Connect",
            "status":2,
            "priority":1,
            "description": "Created By Amazon Connect",
            "requester_id":req.requesterId

            }            
        }else{
              
           data = {
            "name": req.name,
            "phone":req.phoneNumber,
            "subject":"From"+req.phoneNumber+"/Amazon Connect",
            "status":2,
            "priority":1,
            "description": "Created By Amazon Connect",


        }
    }
        

    console.log(data)

       
          
        
         
        const client = httpClient.create({auth: {
            username: apiKey,
            password: 'X',
        },
        headers: {
            "Content-Type": "application/json"
        }});

        let createTicket = await client.post(`${domainName}/api/v2/tickets`,data =data )
        
        

        console.log("createTicket",createTicket.data.ticket)
        return {"statusCode":createTicket['status'],
                "ticketId":createTicket.data.ticket.id
            }
        }catch(e){
            console.log("TICKET ERROR:::",e)
            return Boom.badData('{}',null)
        }

    }

    async freshserviceCreateNote(request){
        try{
            let req = request.payload;
    
            let data
            let domainName = req.domainName;
            let apiKey = req.apiKey;
    
           
              
            
             
            const client = httpClient.create({auth: {
                username: apiKey,
                password: 'X',
            },
            headers: {
                "Content-Type": "application/json"
            }});
    
            let addNote = await client.post(`${domainName}/api/v2/tickets/${req.ticketId}/notes`,
    
               data = {
                "body":req.description,
                "private":false
    
                })
    
            console.log("addNote",addNote)
            return {"statusCode":addNote['status'],
                    "noteId":addNote.data.conversation.id
                }
            }catch(e){
                return Boom.badData('{}',null)
            }
    

    }

    async freshserviceCallerTickets(request){
        try{
            let req = request.params;
    

            let domainName = req.domainName;
            let apiKey = req.apiKey;
    
           
              
            
             
            const client = httpClient.create({auth: {
                username: apiKey,
                password: 'X',
            },
            headers: {
                "Content-Type": "application/json"
            }});

      
    
            let userTickets = await client.get(`${domainName}/api/v2/tickets?requester_id=${req.requesterid}`)
    
            


            return {"statusCode":userTickets['status'],
                  "tickets":userTickets.data.tickets
                   
                }
            }catch(e){
                return Boom.badData('{}',null)
            }

    }

    async  freshserviceSearchUserByNumber(request){
        try{

            let req = request.params;
    
          
            let domainName = req.domainName;
            let apiKey = req.apiKey;

    
           
              
            
             
            const client = httpClient.create({auth: {
                username: apiKey,
                password: 'X',
            },
            headers: {
                "Content-Type": "application/json"
            }});





            let encodedPhoneNumber = urlencode(req.phonenumber)
      
    
            let searchUser = await client.get(`${domainName}/api/v2/requesters?query="work_phone_number:'${encodedPhoneNumber}' OR mobile_phone_number:'${encodedPhoneNumber}'"`)
            console.log("THSI IS NUMBER USER",searchUser)
    
            

            if(!searchUser.data.requesters.length){
                return{
                    "statusCode":searchUser['status'],
                    "displayName":"Unknown Caller",
                    "phoneNumber":req.phonenumber,
                    "id":0
                }

                }else{
                    return {"statusCode":searchUser['status'],
                   "firstName":searchUser.data.requesters[0]['first_name'],
                   "lastName":searchUser.data.requesters[0]['last_name'],
                   "displayName":searchUser.data.requesters[0]['first_name']+' '+searchUser.data.requesters[0]['last_name'],
                   "id":searchUser.data.requesters[0]['id'],  
                   "phoneNumber":searchUser.data.requesters[0].work_phone_number!=null?searchUser.data.requesters[0].work_phone_number:searchUser.data.requesters[0].mobile_phone_number
                }

                }
            
            
            }catch(e){
                return Boom.badData('{}',null)
            }

    }

    async freshserviceAddEndCallNote(request){
        try{
            let data

            let req = request.payload;
    
    
            let domainName = req.domainName;
            let apiKey = req.apiKey;
    
            const client = httpClient.create({auth: {
                username: apiKey,
                password: 'X',
            },
            headers: {
                "Content-Type": "application/json"
            }});
    
            let addNote = await client.post(`${domainName}/api/v2/tickets/${req.ticketId}/notes`,
    
               data = {
                "body":`Agent Handled: &nbsp; ${req.connectAgentHandled}<br>End Call Notes: &nbsp; <a href="${req.connectInstanceUrl}/contact-trace-records/details/${req.connectContactId}">${req.connectContactId}</a>`,
                "private":false
    
                })
    
            console.log("addNote",addNote)
            return {"statusCode":addNote['status'],
                    "noteId":addNote.data.conversation.id
                }
            }catch(e){
                return Boom.badData('{}',null)
            }

    }

    async freshserviceNewRequester(request){
        try{
            let data
            let req = request.payload;
            let domainName = req.domainName;
            let apiKey = req.apiKey;
    
           
              
            
             
            const client = httpClient.create({auth: {
                username: apiKey,
                password: 'X',
            },
            headers: {
                "Content-Type": "application/json"
            }});
    
            let addContact = await client.post(`${domainName}/api/v2/requesters`,
            
               data = {
                "first_name":req.firstName,
                "last_name":req.lastName,
                "work_phone_number":req.phoneNumber
                
    
                })
    
            console.log("addContact",addContact)
            return {"statusCode":addContact['status'],
                    "requesterId":addContact.data.requester.id,
                    "firstName":addContact.data.requester.first_name,
                    "lastName":addContact.data.requester.last_name,
                    "workPhoneNumber":addContact.data.requester.work_phone_number,
                }
            }catch(e){
                return Boom.badData('{}',null)
            }

    }

   
}
module.exports = new FreshserviceHandler();
