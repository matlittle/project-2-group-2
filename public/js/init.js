(function($){
  $.fn.leanModal = function(options) {
    if( $('.modal').length > 0 ){
        $('.modal').modal(options);
    }
  };

  $.fn.openModal = function(options) {
    $(this).modal(options);
    $(this).modal('open');
  };

  $.fn.closeModal = function() {
    $(this).modal('close');
  };

  $('.modal-trigger').leanModal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    backdrop: 'static', 
    keyboard: false
  }
);
    
})(jQuery);