console.log("love");
// document.getElementById("pero1").innerHTML = "I love eveyone";
// success: function(response){
//   try{ 
//     // response = JSON.parse(response);
//     console.log(response)
//     // other logic 
//   }
//   catch(e){
//      // your own logic, when json is not valid!
//   }
// }


// $.post( "/login", function(loginData) {

// })
//   .done(function(data) {
//       if(data.status === 200) {
//           //logged in
//       } else {
//           //logged out
//       }
//   })
//   .fail(function() {
//       //error (bad connection)
// });


$.ajax({
  url: '/love',
  complete: function(data) {
    console.log(data);
  }
});  