var accessToken = localStorage.getItem("accessToken");
if (!accessToken) {
    window.location.href = './login.html'
}

$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault()
        var accessToken = localStorage.getItem("accessToken");
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var isAdmin = $('#admin').is(":checked");

        // Checking for blank fields.
        if (!email || !password || !name) {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields!");
        } else {
            var settings = {
                "url": "http://127.0.0.1:3000/api/user/",
                "method": "POST",
                "headers": {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "isAdmin": isAdmin
                }),
                error: function (data) {
                    console.log(data)
                    toggleNewUserModal()
                    alert("Houve um erro interno. Tente novamente mais tarde!")
                },
            };

            $.ajax(settings).done(function (response) {
                location.reload();
            });
        }
    })

    $.ajax({
        url: 'http://127.0.0.1:3000/api/user/',
        type: 'GET',
        dataType: 'JSON',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        error: function (data) {
            console.log(data)
            alert("Houve um erro interno. Tente novamente mais tarde!")
        },
        success: function (data) {
            $(data).each(
                function () {
                    if (this.isAdmin == true) var admin = "Sim";
                    else var admin = "Não"

                    $('tbody').append(
                        `<tr id="${this.id}"><td>`
                        + this.name
                        + '</td><td>'
                        + this.email
                        + '</td><td>'
                        + admin
                        + '</td><td>'
                        + `<button class="btn-remove-user" onclick="deleteUser('${this.id}')">Remover</button>`
                        + '</td></tr>')
                });
        }
    });
});

function deleteUser(id) {
    var accessToken = localStorage.getItem("accessToken");
    var settings = {
        "url": `http://127.0.0.1:3000/api/user/${id}`,
        "method": "DELETE",
        "headers": {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        error: function (data) {
            console.log(data)
            alert("Houve um erro interno. Tente novamente mais tarde!")
        }
    };

    $.ajax(settings).done(function (response) {
        $(`#${id}`).closest('tr').hide();
    });
}

function toggleNewUserModal() {
    $('.overlay').toggle()
}

function logout() {
    localStorage.removeItem('accessToken')
    window.location.href = './login.html'
}