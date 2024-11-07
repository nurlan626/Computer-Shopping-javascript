// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    const inputName = document.querySelector(".inputName");
    const inputTel = document.querySelector(".inputTel");
    const inputUsername = document.querySelector(".inputUsername")
    const inputPassword = document.querySelector(".inputPassword")


  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
            event.preventDefault()
            const newUser = {
                id: Math.random(),
                username: inputUsername.value,
                password: inputPassword.value,
                name: inputName.value,
                tel: inputTel.value,
                computers: []
            }
            const users = JSON.parse(localStorage.getItem("users"))
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users))
            document.querySelector(".alert-success").style.display = "block"
           
            setTimeout(() =>{
                window.location.href = "../index.html"

            }, 2000)
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()