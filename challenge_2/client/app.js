
$(document).ready(function() {
  app.init();
});
const app = {
  server: 'hppt://127.0.0.1:3005',
  // init when page load
  init: function(){
    // add listner to submit button
    $('#submit').on('click', function(event){
      event.preventDefault();
      // get user's input info
      var data = $('#inputText').val();  
      // call handld function 
      app.insertToFile(data);
    })
  },
  insertToFile: function(data) {
    // with post method, send data to server 
    alert('insert function working!')
    var test = {'info': data};
    $.ajax({
      url: '/',
      contentType: 'application/json',
      method: "POST",      
      data: JSON.stringify(test),
    }).done(function(res){
    })
  },
  renderDataToScreen: function() {
    // get method fetch data from server side
    
  }
}