

$('#formSubmit').on('click', () => {
    const userName = $('#userName').val().trim()
    const userEmail = $('#userEmail').val().trim()
    const userMessage = $('#userMessage').val().trim()

    const userData = {
        name: userName,
        email: userEmail,
        message: userMessage
    }

    $.ajax({
        type: "POST",
        url: '/send-email',
        data: userData
      });

    empty()
} )

const empty = () => {
    $('#userName').val('')
    $('#userEmail').val('')
    $('#userMessage').val('')
}


$( document ).ready(() => {
  
    

});




