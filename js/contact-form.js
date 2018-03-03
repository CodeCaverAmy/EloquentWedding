$(document).ready(function () {

  var form = '#contactForm';

  $(form).on('submit', function (e) {
    e.preventDefault();
    $('input#submit').attr('value', 'Processing..');
    var name = $("input#name").val();
    var email = $("input#email").val();
    var phone = $("input#phone").val();
    var message = $("textarea#message").val();
    var route = "process.php";

    /*messages for guests*/
    var target = '#alert';
    var errMsg = 'Oops, having problems sending messages at the moment.';
    var sucMsg = "Thanks! Your message has been received. Someone will get back to you.";
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
      /*process the form*/
      var jqxhr = $.ajax({
        type: "POST",
        dataType: 'json',
        url: route,
        data: {
          "name": name,
          "email": email,
          "phone": phone,
          "message": message
        },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.responseJSON.status) {
            if (data.mailSent) {
              /*reset the form*/
              $(form)[0].reset();
              /*reset button*/
              resetSubmit();

              /*show success message*/
              $(target).removeClass('hidden').removeClass('alert-danger').addClass('alert-success');
              $(target).text(sucMsg);
              $('input#submit').attr('value', 'Message Sent');
            } else {
              $(target).removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
              $(target).text(data.mailSent);
              $('input#submit').attr('value', 'Message Failed to Send');
            }
          } else {
            alert(jqXHR.responseJSON.message);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          resetSubmit();
          /*alert( textStatus + " " + errorThrown );*/
          $(target).removeClass('hidden').removeClass('alert-success').addClass('alert-danger');
          $(target).text(errMsg);
        }
      })
    }
  });
});