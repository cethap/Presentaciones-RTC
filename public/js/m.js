var socket = io.connect(location.origin);

$(".list a").click(function(e){
	e.preventDefault();
	var el = $(this);
	socket.emit('sendLink',{href:el.attr("data-href")});
});