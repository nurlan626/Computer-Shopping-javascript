// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    const inputUsername = document.querySelector(".username");
    const inputPassword = document.querySelector(".password");

    const succes = document.querySelector(".success");
    const error = document.querySelector(".error")

  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users.find((item) => {
            return item.username === inputUsername.value && item.password === inputPassword.value
        })
        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
            succes.style.display = "block";
            error.style.display = "none"
            inputUsername.setCustomValidity("")
            inputPassword.setCustomValidity("")
            setTimeout(() => {
                window.location.href = "../index.html"
            }, 3000)
        } else {
            inputUsername.setCustomValidity("dont log in")
            inputPassword.setCustomValidity("dont log in")
            succes.style.display = "none";
            error.style.display = "block"
        }

        form.classList.add('was-validated')


      }, false)
    })
  })()