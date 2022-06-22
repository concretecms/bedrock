// toggle password fields visibility
;(function (global, $) {
  'use strict';

  $('div#ccm-dashboard-page').on(
    'click',
    '.btn-toggle-password-visibility',
    function () {
      const input = $(this).parent('.input-group').find('input');
      const icon = $(this).find('i');
      if (input.length === 0 || icon.length === 0) return;

      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        icon.addClass('fa-eye-slash');
      } else {
        input.attr('type', 'password');
        icon.removeClass('fa-eye-slash');
      }
    }
  );
})(window, jQuery);
