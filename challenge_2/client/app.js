
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
      $('#inputText').val("")
      // call handld function 
      app.convertToCsv(data);
    })
  },
  convertToCsv: function(data) {
    // with post method, send data to server 
    var data = {'info': data};
    $.ajax({
      url: '/',
      contentType: 'application/json',
      method: "POST",      
      data: JSON.stringify(data),
    })
    .done(function(res){
      app.renderDataToScreen(res);
    })
  },
  renderDataToScreen: function(res) {
    const contents = res.split('\n');
    const header = contents.splice(0, 1)[0].split(',');
    if(!$('#insertHeader > th').length) {
      header.forEach(function(el) {
        $('#insertHeader').append(`<th>${el}</th>`)
      })
    }
    contents.forEach(function(row) {
      // insert row
      $("#insertContents").append(`<tr>${
        // insert item for row
        row.split(',').forEach((item) => {
          $('#insertContents').append(`<td>${item}</td>`);
        })
      }</tr>`)
    })
  }
}