    var page_details_location={
        init : function(){
            this.tabs();
        },
                    
        tabs : function(){
            var container = $("#menu .col-sm-8"),
                uls = container.children(".food_info"),
                menus = $(".menus");
           
                /* when clicking food category show menu items */         
                menus
                    .delegate('li','click',function(e){
                        var li = $(this),
                            hash;

                        li.siblings().removeClass('selected').end().addClass('selected'); 
                        hash = li.children('a').attr('href');
                                                 
                        var menus_height = $('.menus').height(),
                            viewport_width = $('body').innerWidth(),
                            nr_categories = $(hash).children('li').length - 1;
                          
                            if(viewport_width >= 768){
                                                     
                                if(nr_categories <= 7){
                                    $(hash).css('height',menus_height);     
                                }
                            }
                                                      
                        uls.hide().filter(hash).fadeIn(400); 
                        e.preventDefault();        
                    }); // end delegate
        } // end tabs function
    }

    page_details_location.init();
    $('.menus li a').first().click();
       

    /* ************* when the DOM is fully loaded execute following code ********************* */
    $(document).ready(function() {
        
        /* ********** lightslider ************** */  
        $("#lightSlider").lightSlider({
            item : 1,
            gallery: true,
            loop: false,
            thumbItem:4,
                    
            adaptiveHeight: true,
            responsive:[
                {   breakpoint:991,
                    settings:{
                        thumbItem:3,
                        slideMargin:10
                    }
                },
                {   breakpoint:480,
                    settings:{
                        thumbItem:2,
                        slideMargin:50
                    }
                }
            ]
        }); 
       
        /* current position of navigation id - navbarOptions */
        var navpos = $('#navbarOptions').offset(); 
                             
        /* height of navbarOptions element + padding + border + margin */
        var navheight = $('#navbarOptions').outerHeight(true); 
                       
        /* if scrolling reaches navbarOptions => add navbar-fixed-top class */
        $(window).bind('scroll', function(){
            if($(window).scrollTop() > navpos.top) {
                $('#navbarOptions').addClass('navbar-fixed-top');
                $('#bootstrap_scrollspy').css('marginTop', navheight);
                $('#place_details h3').css('marginTop','40px');
            }
            else{
                $('#navbarOptions').removeClass('navbar-fixed-top');
                $('#bootstrap_scrollspy').css('marginTop', '0');
            }
        }); /*end bind event*/

        /* when viewport < 768px, click a menu list item => I want navbarOptions to collapse */
        $('.navOptions a').on('click', function(){
            $('#navbarOptionsCollapse').collapse('hide');
        });


        /* ******** Smooth scrolling ************ */
        $('#navigation_options a[href="#contact_info"], #contact_info a[href="#directions"], .nav.navbar-nav a[href*="#"]')
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
            // On-page links
            if( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')  && 
                location.hostname == this.hostname ){

                    // Figure out element to scroll to
                        var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                    // Does a scroll target exist?
                        if (target.length) {
                            $(document).click();

                                // Only prevent default if animation is actually going to happen
                                event.preventDefault();

                                $('html').animate({
                                    scrollTop: (target.offset().top - navheight)
                                    //scrollTop: target.offset().top 
                                    }, 600, function() {
                                        // Callback after animation
                                          var $target = $(target);
                                              $target.focus();
                                                  
                                            if ($target.is(":focus")) { // Checking if the target was focused
                                                return false;
                                            } 
                                             else {
                                                //$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                                                $target.focus(); // Set focus again
                                            };
                                }); /* end animate */
                                
                        } /* end if target*/
            } /* end if on-page links */
        }); /* end smooth scrolling click event */


        /* *********** Ratings **************** */
        $('#vote_rating').barrating({
            theme: 'fontawesome-stars'        /* refers to css/themes/fontawesome-stars.css, can be switched to another theme -> change link css file first */
        });                                   /* js plugin is in -> js/jquery.barrating.min.js */


        /* **********  Fancy Box for Gallery  *************** */
        $('.galleries a').fancybox({
            helpers : {
                overlay : {
                    css : {
                        'background' : 'rgba(200, 200, 200, 0.5)'      /* when overlay change background color to a greyish color */
                    }
                }
            }        
        });
             
        $('.galleries a').attr('rel', 'gallery').fancybox({
            padding : 5                                               /* modify default padding around image */
        });


        /* *********** To top button functionality in the menu ************ */
            
       var to_menu_height = $('#contact_info').outerHeight(true) + $('#navbarOptions').outerHeight(true) +
            $('#place_details').outerHeight(true) + $('#gallery').outerHeight(true),
                
            menu_offset = to_menu_height - 110,
            menu_offset_opacity = 1200, /* browser window scroll (in pixels) after which the "back to top" link opacity is reduced */
            menu_scroll_top_duration = 700, /* duration of the top scrolling animation (in ms) */

            /* grab the "back to top" link */
            $back_to_top = $('.to-top'),
            menu_height = $('#menu').outerHeight(true),                        
            viewport_width = $("body").innerWidth(),
            subtract_height_m,                          /* based on viewport subtract height from menu to position vertically ok the to-top button */
            show_button = true;
                
            if(viewport_width >= 1200){
                subtract_height_m = 200;

                var container = $("#menu .col-sm-8"),
                    uls = container.children(".food_info"),
                    menus = $(".menus");
           
                    /* when clicking food category show menu items */         
                    menus
                        .delegate('li','click',function(e){
                            var li = $(this), hash;

                            li.siblings().removeClass('selected').end().addClass('selected'); 
                            hash = li.children('a').attr('href');
                            var nr_categories = $(hash).children('li').length - 1 ;
                                                    
                            if((nr_categories == 0) || (nr_categories == 1) || (nr_categories == 2) || (nr_categories == 3) || (nr_categories == 4) || (nr_categories == 5)|| (nr_categories == 6) || (nr_categories == 7)){
                                subtract_height_m = 470;                                    
                            }
                            
                            else if(nr_categories == 8){
                                subtract_height_m = 400;                               
                            }

                            else if((nr_categories == 9) || (nr_categories == 10)){
                                subtract_height_m = 200;                                
                            }
                        });
            }

            else if( (viewport_width >= 992) && (viewport_width <= 1199) ){
                subtract_height_m = 200;  
            }

            else if( (viewport_width >= 768) && (viewport_width <= 991) ){
                subtract_height_m = 100;
                var container = $("#menu .col-sm-8"),
                    uls = container.children(".food_info"),
                    menus = $(".menus");
           
                    /* when clicking food category show menu items */         
                    menus
                        .delegate('li','click',function(e){
                            var li = $(this), hash;

                        li.siblings().removeClass('selected').end().addClass('selected'); 
                        hash = li.children('a').attr('href');
                         
                        var nr_categories = $(hash).children('li').length - 1,
                            menus_height = $('.menus').height();

                            if(nr_categories <= 8){
                                $(hash).css('height',menus_height);     
                            }
                                                     
                            if((nr_categories == 0) || (nr_categories == 1) || (nr_categories == 2) || (nr_categories == 3) || (nr_categories == 4)){
                                subtract_height_m = 400;                                    
                            }
                            
                            else if((nr_categories == 5) || (nr_categories == 6) || (nr_categories == 7) || (nr_categories == 8)){
                                subtract_height_m = 300;                                    
                            }
                            
                            else if((nr_categories == 9) || (nr_categories == 10)){
                                subtract_height_m = 100; 
                            }
                         
                        });
            }

            else if( (viewport_width >= 481) && (viewport_width <= 767) ){
                subtract_height_m = -150;
                var container = $("#menu .col-sm-8"),
                    uls = container.children(".food_info"),
                    menus = $(".menus");
           
                    /* when clicking food category show menu items */         
                    menus
                        .delegate('li','click',function(e){
                        var li = $(this), hash;

                            li.siblings().removeClass('selected').end().addClass('selected'); 
                            hash = li.children('a').attr('href');
                            var nr_categories = $(hash).children('li').length - 1,
                                product_height = $(hash).children('li:first').outerHeight(true);

                                if(nr_categories <= 4){
                                    show_button = false;
                                }

                                else if(nr_categories >= 5){
                                    show_button = true;
                            
                                    if(nr_categories == 5){
                                        subtract_height_m = product_height*4;   
                                    }

                                    else if(nr_categories == 6){
                                        subtract_height_m = product_height*3;   
                                    }

                                    else if(nr_categories == 7){
                                        subtract_height_m = product_height*2;   
                                    }

                                    else if(nr_categories == 8){
                                        subtract_height_m = product_height;   
                                    }

                                    else if(nr_categories == 9){
                                        subtract_height_m = product_height*(-1);
                                    }

                                    else if(nr_categories == 10){
                                        subtract_height_m = product_height*(-2);
                                    }
                                }
                        });
            } // end viewport 481 - 767

            else if(viewport_width <= 480){
                subtract_height_m = -100;      
                var container = $("#menu .col-sm-8"),
                    uls = container.children(".food_info"),
                    menus = $(".menus");
           
                    /* when clicking food category show menu items */         
                    menus
                        .delegate('li','click',function(e){
                            var li = $(this), hash;

                            li.siblings().removeClass('selected').end().addClass('selected'); 
                            hash = li.children('a').attr('href');
                            var nr_categories = $(hash).children('li').length - 1,
                                product_height = $(hash).children('li:first').outerHeight(true);

                                if(nr_categories <= 3){
                                    show_button = false;
                                }

                                else if(nr_categories >= 4){
                                    show_button = true;
                            
                                    if(nr_categories == 4){
                                        subtract_height_m = product_height * 5;                                    
                                    }

                                    else if(nr_categories == 5){
                                        subtract_height_m = product_height * 4;   
                                    }

                                    else if(nr_categories == 6){
                                        subtract_height_m = product_height * 3;   
                                    }

                                    else if(nr_categories == 7){
                                        subtract_height_m = product_height * 2;   
                                    }

                                    else if(nr_categories == 8){
                                        subtract_height_m = product_height;   
                                    }

                                    else if(nr_categories == 9){
                                        subtract_height_m = product_height * (-1);
                                    }

                                    else if(nr_categories == 10){
                                        subtract_height_m = product_height * (-1.5);
                                    }
                                }
                        });
            } // end else if viewport <= 480px
           
            /* hide or show the "back to top" link */
            $(window).scroll(function(){

                (( $(this).scrollTop() > menu_offset ) && show_button) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if( $(this).scrollTop() > menu_offset_opacity ) { 
                    $back_to_top.addClass('cd-fade-out');
                }

                if( $(this).scrollTop() > (menu_offset - subtract_height_m + (menu_height / 2)) ){
                    $back_to_top.removeClass('cd-is-visible cd-fade-out');
                }
            }); /* end scroll */
                          
            $back_to_top.on('click', function(event){ 
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: menu_offset,
                }, menu_scroll_top_duration);
            }); /* end click back_to_top */

        /* *************** Rating restaurant services  *************** */    

            $('#meal_q, #fast_s, #meal_p').barrating({
                theme: 'fontawesome-stars'                      
            });                                                 

    }); /* end document ready */


    /* ********** Carousel Testimonials ************ */    
    $(window).load(function() {
        var $items = $('.carousel[data-type="multi"] .item'),           /* grab all slides in carousel */
            heights = [],                                                /* create empty array to store height values */
            tallest;                                                     /* create variable to make note of the tallest slide */

            $items.each(function() {
                var next = $(this).next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }                                
            }); // end each
    
            if ($items.length) {
                function normalizeHeights() {
                    $items.each(function() {                     
                        heights.push($(this).height());
                    });
                          
                    tallest = Math.max.apply(null, heights);            /* cache largest value */
                    $items.each(function() {
                        $(this).css('min-height', tallest + 'px');
                    });
                }; // end function

                normalizeHeights();
                   
                $(window).on('resize orientationchange', function() {
                    tallest = 0, heights.length = 0;      

                    $items.each(function() {
                        $(this).css('min-height', '0');                 /* reset min-height */
                    }); 

                    normalizeHeights(); 
                });                                                     /* end window resize */
            }                                                          /* end if items length */

    });