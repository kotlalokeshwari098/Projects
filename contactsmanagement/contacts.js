const prompt=require("prompt-sync")();

function printInfo(){
    console.log("contact management system");
    console.log("----------------------------------");
    console.log("1.Add a contact");
    console.log("2.Delete a contact")
    console.log("3.view contacts");
    console.log("4.search contacts");
    console.log("5.exit");
}
printInfo();

function addContact(){
         const name=prompt("Name:");
         const email=prompt("Email: ")
         const contact={
            name : name,
            email :email 
         }
         contacts.push(contact);
         console.log("addeddd-----------");
}
function deleteContact(contacts){
      for(let i=0 ; i<contacts.length ; i++){
        console.log((i+1).toString() + ":"+ contacts[i].name)
      }
      let number=parseInt(prompt("enter the number to delete"));
      if(isNaN(number) || number > 0 && number < contacts.length){
    }
      contacts.splice(number-1,1);
      console.log();
 
}
function searchContact(){
    const searchString=prompt("search").toLowerCase();
    const result=[];
    for(const contact of contacts){
        if(contact.name.includes(searchString)) result.push(contact);
    }
    listContacts(result);
}
function listContacts(contacts){
    for(let contact of contacts ){
        console.log("---------------------");
        console.log("Name:" + contact.name);
        console.log("Email:" + contact.email);
    }


}
const contacts=[];

let keepGoing=true;
while(keepGoing){
    const number=prompt("enter the operation(1-5)");
    console.log();
    switch(number){
        case '1':
            addContact();
            break;
        case '2':
            deleteContact(contacts);
            break;
        case '3':
            listContacts(contacts);  //pass contacts
            break;
        case '4':
            searchContact();
            break;
        case '5':
            keepGoing=false;
            break;
        default:
            console.log("unknown");
            break;
    }
}