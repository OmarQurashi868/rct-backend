
// The example below shows you how a cloud code function looks like.

/* Parse Server 3.x
* Parse.Cloud.define("hello", (request) => {
* 	return("Hello world!");
* });
*/

/* Parse Server 2.x
* Parse.Cloud.define("hello", function(request, response){
* 	response.success("Hello world!");
* });
*/

// To see it working, you only need to call it through SDK or REST API.
// Here is how you have to call it via REST API:

/** curl -X POST \
* -H "X-Parse-Application-Id: C4cWcwQYhP7Tq642E60zubJe5d7JVd6abfrBavMf" \
* -H "X-Parse-REST-API-Key: FSgWoinojzgaygNvnaoOuqTTaWbD0poqRHcccMC1" \
* -H "Content-Type: application/json" \
* -d "{}" \
* https://parseapi.back4app.com/functions/hello
*/

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */

Parse.Cloud.define("test", (request) => {
  console.log("Hey there!")
  return ("Hey there!");
});

Parse.Cloud.define("fetchData", async (request) => {
  const username = request.params.username;
  const platform = request.params.platform;
  
  const query = new Parse.Query("keys");
  const result = await query.find({useMasterKey:true});
  
  if (result.length == 0) {
    const keys = new Parse.Object("keys");
    
    try {
      // get new keys from api
      const response = await Parse.Cloud.httpRequest(
        {url: process.env.process.env.URL_TICKET_GEN,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.UBI_AUTH,
          "Ubi-AppId": process.env.UBI_APPID,
          "Ubi-RequestedPlatformType": "uplay"
        }})
      return response
    } catch (error) {
      return error;
    }
  }
  
  return await query.find({useMasterKey:true});
  
  // get user profileid
  
  // get user data
  
  return("hi")
})