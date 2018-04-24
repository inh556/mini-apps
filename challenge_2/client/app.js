
$(document).ready(function() {
  app.init();
});
const app = {
  server: 'hppt://127.0.0.1:3000',
  init: function(){
    $(document).on('click','#submit', function(){
      alert('listener is working!');
    })
  },
}