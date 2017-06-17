(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

     //buttons
    $(".button-collapse").sideNav();
    //loader and loading
    $('.loading img').fadeIn(600).removeclass('hide');
    const toastTimeout = window.setTimeout(function setToastTimeout() {
      //Some toast
      Materialize.toast('Welcome back Jeremy', 4000);
      window.clearTimeout(toastTimeout);
    }, 3000)
    , secondToastTimeout = window.setTimeout(function setSecondToastTimeout() {
      //Some toast
      Materialize.toast('Hubuntu UI is available on &nbsp;<a class="deep-orange-text text-lighten-1" href="https://github.com/720kb/hubuntu-ui" target="_blank">Github</a>', 60000);
      window.clearTimeout(secondToastTimeout);
    }, 5000);

  }); // end of document ready
})(jQuery); // end of jQuery name space
