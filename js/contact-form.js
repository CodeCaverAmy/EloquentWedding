$(document).ready(function () {

  var contactform = document.getElementById('contactForm');

  $(contactform).on('submit', function (e) {
    e.preventDefault();
    $('input#submit').attr('value', 'Processing..');
    var name = $("input#name").val();
    var email = $("input#email").val();
    var phone = $("input#phone").val();
    var message = $("textarea#message").val();

    /*messages for guests*/
    var target = '#alert';
    var errMsg = 'Oops, having problems sending messages at the moment.';
    var sucMsg = "Thanks! I will respond to you within 24 hours.";
    var nameError = "Name is required";
    var emailError = "Email is required";
    var phoneError = "Phone is required";
    var messageError = "Message is required";
    var messageShortError = "Message is too short";

    function validate(name, email, message, phone) {
      $(target).removeClass('alert-success')

      if (name == "") {
        $("input#name").parent('div').addClass('has-error');
        $(target).removeClass('hidden').addClass('alert-danger');
        $(target).text(nameError);
        $("input#name").focus();
        resetSubmit();
        return false;
      }
      $("input#name").parent('div').removeClass('has-error');

      if (email == "") {
        $("input#email").parent('div').addClass('has-error');
        $(target).removeClass('hidden').addClass('alert-danger');
        $(target).text(emailError);
        $("input#email").focus();
        resetSubmit();
        return false;
      }
      $("input#email").parent('div').removeClass('has-error');

      if (phone == "") {
        $("input#phone").parent('div').addClass('has-error');
        $(target).removeClass('hidden').addClass('alert-danger');
        $(target).text(phoneError);
        $("input#phone").focus();
        resetSubmit();
        return false;
      }
      $("input#phn").parent('div').removeClass('has-error');

      if (message == "") {
        $("textarea#message").parent('div').addClass('has-error');
        $(target).removeClass('hidden').addClass('alert-danger');
        $(target).text(messageError);
        $("textarea#message").focus();
        resetSubmit();
        return false;
        //check message length
      } else if (message.length < 10) {
        $(target).removeClass('hidden').addClass('alert-danger');
        $(target).text(messageShortError);
        $("textarea#message").focus();
        resetSubmit();
        return false;
      }
      $("#message").parent('div').removeClass('has-error');
      /*if all is good*/
      $(target).removeClass('alert-danger').addClass('hidden');
      $(target).text('');
      return true;
    }

    function resetSubmit() {
      $('input#submit').attr('value', 'SEND MESSAGE');
    }

    if (validate(name, email, message, phone) == true) {
      $.ajax({
        url: 'https://formspree.io/xegzwbbx',
        method: "POST",
        data: {
          name: name,
          email: email,
          phone: phone,
          message: message,
          _replyto: email,
          _subject: "New message from Eloquent Wedding"
        },
        dataType: "json",
        success: function () {
          /*reset the form*/
          $(contactform)[0].reset();
          /*reset button*/
          resetSubmit();
          /*show success message*/
          $(target).removeClass('hidden').removeClass('alert-danger').addClass('alert-success');
          $(target).text(sucMsg);
        }, 
        error: function () {
          resetSubmit();
          $(target).removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
          $(target).text( errMsg );
        }
      });
    }
  });
});