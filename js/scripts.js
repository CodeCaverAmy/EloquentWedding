$(document).ready(function(){

 /*****************************************
*     menu bottom border animation
*****************************************/


  function NavUnderline(){
     $('.navbar-nav >li:not(.menu-underline)').hover(function(){
        goToNavItem($(this));
     },function(){
        goToNavItem($(this).siblings('.active'));
     });
     /*also trigger function when scrollspy works*/
      $('.navbar-nav >li').on('activate.bs.scrollspy', function () {
        goToNavItem($(this));
      })

     function goToNavItem($item){
        if($item.length == 0) return;
        var parent_left = $item.parent().length ? $item.parent().offset().left : 0;
        var offset = $item.offset().left - parent_left;
        $item.siblings('.menu-underline').css({left: offset, width: $item.width()});
     }

     // function navOffset()
  }
  NavUnderline();
/***************************
*       sticky nav          *
****************************/
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('body').addClass("nav-is-sticky");
        $('#header').addClass("slideFromTop");
    } else {
        $('body').removeClass("nav-is-sticky");
        $('#header').removeClass("slideFromTop");

    }
});

windowHeight = $(window).height();
navHeight = $('#header-sticky-wrapper').height();
showcaseHeight = windowHeight - navHeight;
/*$("#showcase").css('height', showcaseHeight);*/


/***********************************
*          Menu offset target      *
************************************/
//set offset
  offset = $('.navbar-default').height();
    // offset = 150;
  $("body").scrollspy({target: ".navbar-default", offset: offset});
  $(".navbar-default li a").on('click', function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();
    $('.navbar-collapse').collapse('hide');

    var hash = this.hash;
    scrollPos = $(hash).offset().top - (offset - 1);
    $('html, body').animate({
      scrollTop: scrollPos
    }, 800);
  });
/****************************
*        Explore button anim  *
*****************************/
  $("#explore span").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: 570}, 1500);
  });

/********************************
*         back to top           *
*********************************/
  $("#toTop").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: 0}, 800);
  });

/***********************************
*           Home slider            *
***********************************/
  $(".slides").owlCarousel({
      // animateOut: 'bounceOut',
      animateOut: 'fadeOutDown',
      animateIn: 'fadeIn',
      items:1,
      margin:0,
      stagePadding:0,
      smartSpeed:450,
      autoplay: true,
      autoplaySpeed:500,
      loop:true,
      dots:false,
      lazyLoad: true
      // autoHeight: true
      // autoWidth:true
  });

/***********************************
*             Reviews              *
***********************************/
  $("#review-list").owlCarousel({
    items:1,
    margin:0,
    stagePadding:0,
    autoplay: false,
    autoplaySpeed:700,
    loop:true
    // autoHeight:true
  });

/***********************************
*               Team               *
***********************************/
  $("#members").owlCarousel({
    autoPlay: true,//3000, //Set AutoPlay to 3 seconds
    stopOnHover: true,
    // items : 4,
    // margin:0,
    stagePadding:0,
    smartSpeed:450,
    // responsiveClass:true,
    responsive:{
          0:{
              items:1,
          },
          480 : {
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:4,
          }
      }
  });

/************************************
*         Light Gallery             *
************************************/
  // var options = {
  //   'download': false,
  //   'actualSize': false
  // };
  // $("#gallery").lightGallery(options);
  $("#gallery").lightGallery({
      'download': false,
    'actualSize': false
    });

/************************************
*         Portfolio/isotope         *
************************************/
  if (typeof Isotope == 'function') {
     /* init Isotope*/
    // var $container = $('.portfolio-list').isotope({
    //   itemSelector: '.item',
    //   layoutMode: 'fitRows',
    //   // filter: ':nth-child(-n+10)'
    //   // fitRows: {
    //   //   gutter: 15
    //   // }
    // });

    var $container = $('.portfolio-list')
    // initialize Isotope
    $container.isotope({
      itemSelector: 'li',
      gutter: 0,
      transitionDuration: "0.5s"
    });

    /* bind filter button click*/
    $('.portfolio-filter').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

    /* change is-checked class on buttons*/
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.btn-primary').removeClass('btn-primary');
        $( this ).addClass('btn-primary');
      });
    });
  };

/***********************************
*             Skillbars/skills             *
*  start skill bar when appeared   *
***********************************/
  $('[data-percent]').each(function() {
    $(this).appear().on("appear", function() {
      $(this).find('.skillbar-bar').animate({
        width:$(this).attr('data-percent')
      },1000);

    });

  });

/***********************************
*             Counts               *
*     start count when appeared    *
***********************************/
  $('.counts').each(function() {
    $(this).appear().on('appear', function() {
      if( $(this).html() == 0 ) {
        $(this).countTo({
            speed: 3000
        });
      }
      // $(this).removeAttr("data-form").removeAttr("data-to");
    });
  });

/**********************************
*         WOW script init         *
**********************************/
  new WOW({
      animateClass: 'animated',
      // offset:       100,
      mobile:       true,
      live:         true,
      callback:     function(box) {
        // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
      }
    }
  ).init();

});/*document ready close*/


/******************************
*         Preloader           *
******************************/

$(window).load(function() {
  $('.loader').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});
});
