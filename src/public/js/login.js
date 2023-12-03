const $ = id => document.getElementById(id);


window.onload = function(e) {

    $('email').addEventListener('focus', function() {
        $('msgError-email').innerHTML = null;
        this.classList.remove("is-invalid");
                    
        })

    $('email').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                $('msgError-email').innerHTML = "El email es obligatorio";
                this.classList.add("is-invalid");
                break;
            case !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value):
                $('msgError-email').innerHTML = "El email es invalido";
                this.classList.add("is-invalid");
                break;
            
            default:
                $('msgError-email').innerHTML = null;
                this.classList.remove("is-invalid");
                this.classList.add("is-valid");
                break;
        }
    });

    $('email').addEventListener('change', async function(e) {

        try {
            
            const response = await fetch(`/api/check-email?email=${this.value}`);

        const result = await response.json();

        if(!result.data){

            $('msgError-email').innerHTML = "El email no se encuentra registrado - REGISTRESE";
            this.classList.add("is-invalid");

        }

        
        } catch (error) {
            console.error();
        }

        
    });

    $('email').addEventListener('focus', function() {
        $('msgError-email').innerHTML = null;
        this.classList.remove("is-invalid");
                    
        })

    $('password').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                $('msgError-password').innerHTML = "El contraseña es obligatorio";
                this.classList.add("is-invalid");
                break;
            case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/.test(this.value):
                $('msgError-password').innerHTML = "La contraseña debe tener entre 6 y 12 caracteres, un numero, una mayuscula y un caracter especial";
                this.classList.add("is-invalid");
                break;
            
            default:
                $('msgError-password').innerHTML = null;
                this.classList.remove("is-invalid");
                this.classList.add("is-valid");
                break;
        }
    });

    $('password').addEventListener('focus', function() {
    $('msgError-password').innerHTML = null;
    this.classList.remove("is-invalid");
                
    })

    $('button-eye').addEventListener('click', function(e) {

        $('msgError-password').innerHTML = null;
        $('password').classList.remove("is-invalid");

        this.classList.toggle('fa-solid')
        this.classList.toggle('fa-eye-slash')
        
        this.classList.toggle('fa-eye')
        this.classList.toggle('fa')

        $('password').type = $('password').type === "password" ? "text" : "password"
    });

        
    $('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();

        const elementsForm = $('formLogin').elements;

        let error = false

        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(!elementsForm[i].value.trim() || elementsForm[i].classList.contains('is-invalid')){
                elementsForm[i].classList.add('is-invalid')
                $('msgError-empty').innerHTML = "Todos los campos son obligatorio"
                error = true
            }
        }

        !error && this.submit()

        
    })
}