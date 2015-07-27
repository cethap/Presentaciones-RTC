var menu = document.querySelector('.nav__list');
var burger = document.querySelector('.burger');
var doc = $(document);
var l = $('.scrolly');
var panel = $('.panel');
var vh = $(window).height();

var openMenu = function() {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('nav__list--active');
};

// reveal content of first panel by default
panel.eq(0).find('.panel__content').addClass('panel__content--active');

var scrollFx = function() {
  var ds = doc.scrollTop();
  var of = vh / 4;
  
  // if the panel is in the viewport, reveal the content, if not, hide it.
  for (var i = 0; i < panel.length; i++) {
    if (panel.eq(i).offset().top < ds+of) {
     panel
       .eq(i)
       .find('.panel__content')
       .addClass('panel__content--active');
    } else {
      panel
        .eq(i)
        .find('.panel__content')
        .removeClass('panel__content--active')
    }
  }
};

var scrolly = function(e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);

  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 300, 'swing', function () {
      window.location.hash = target;
  });
}

var init = function() {
  burger.addEventListener('click', openMenu, false);
  window.addEventListener('scroll', scrollFx, false);
  window.addEventListener('load', scrollFx, false);
  $('a[href^="#"]').on('click',scrolly);

  $(document).keydown(function(e) {
      var hh = location.hash.split("#")[1]||1;
      hh = parseInt(hh+"");
      var hl = $(".panel").length;
      switch(e.which) {
          case 37: // left
            if(hh>1){
              location.hash = "#"+(hh-1);
            }
          break;

          case 38: // up
            if(hh>1){
              location.hash = "#"+(hh-1);
            }
          break;

          case 39: // right
            if(hh<hl){
              location.hash = "#"+(hh+1);
            }
          break;

          case 40: // down
            if(hh<hl){
              location.hash = "#"+(hh+1);
            }
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

};

doc.on('ready', init);

var socket = io.connect(location.origin);

socket.on('Linkiar', function (data) {
  location.hash = data.href;
});
