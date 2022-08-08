var accessToken = localStorage.getItem("accessToken");
if (!!accessToken) {
    window.location.href = './index.html'
}

$(document).ready(function () {
    $("#login").click(function (event) {
        event.preventDefault()
        var email = $("#email").val();
        var password = $("#password").val();

        // Checking for blank fields.
        if (!email || !password) {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields!");
        } else {
            var settings = {
                url: "http://127.0.0.1:3000/api/user/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "email": email,
                    "password": password
                }),
                error: function (data) {
                    alert("Houve um erro, tente novamente!")
                }
            };

            $.ajax(settings).done(function (response) {
                localStorage.setItem('accessToken', response.accessToken)
                window.location.href = 'index.html';
            });
        }
    });
})