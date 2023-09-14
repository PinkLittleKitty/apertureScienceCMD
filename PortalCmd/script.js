const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
let isLoginInProgress = false;
let username = "";

inputElement.value = "> ";
inputElement.setSelectionRange(2, 2);

inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = inputElement.value.trim();
        inputElement.value = "> "; 
        inputElement.setSelectionRange(2, 2); 

 
        executeCommand(command);
    }
});

function executeCommand(command) {
    const output = document.createElement("div");
    output.className = "output-text";
    output.textContent = command; 
    outputElement.appendChild(output);

    const lowerCaseCommand = command.toLowerCase();

    function typeText(text, targetElement) {
        let index = 0;
        let currentLine = '';
        const typeInterval = setInterval(function () {
            if (index < text.length) {
                if (text.charAt(index) === '<' && text.substring(index, index + 4) === '<br>') {

                    targetElement.innerHTML += '<br>';
                    currentLine = '';
                    index += 4;
                } else {
                    currentLine += text.charAt(index);
                    targetElement.innerHTML += text.charAt(index);
                    index++;
                }
            } else {
                clearInterval(typeInterval);
            }
        }, 10);
    }


    if (lowerCaseCommand === "> ayuda") {
        const helpResponse = document.createElement("div");
        helpResponse.className = "output-text";
        helpResponse.innerHTML = "";
        outputElement.appendChild(helpResponse);

        
        const helpText =
        `Si se trata de una solicitud real de ayuda en respuesta a un derrame de material peligroso, una explosión, un incendio en su persona, envenenamiento por radiación, un gas asfixiante de origen desconocido, trauma ocular resultante del uso de una estación de lavado de ojos de emergencia en los pisos tres, cuatro u once, un mal funcionamiento de un animal o cualquier otro fallo de equipo experimental lesivo, permanezca en su lugar de trabajo. Un Equipo de Respuesta a Crisis ya ha sido movilizado para deliberar sobre una respuesta a su crisis.<br><br>Si necesita ayuda para acceder al sistema, consulte su Manual del Usuario.`;

        typeText(helpText, helpResponse);
    } else if (lowerCaseCommand === "> login") {
    
        if (!isLoginInProgress) {
            isLoginInProgress = true;
            username = ""; 
            const loginResponse = document.createElement("div");
            loginResponse.className = "output-text";
            loginResponse.textContent = "Por favor, introduzca su nombre de usuario.";

            outputElement.appendChild(loginResponse);
        } else {
            
            const password = command.trim();

            if (password === "> portal" || password === "> portals") {
                isLoginInProgress = false;
                const loginSuccessfulResponse = document.createElement("div");
                loginSuccessfulResponse.className = "output-text";
                loginSuccessfulResponse.textContent = "Inicio de sesión correcto!";
                outputElement.appendChild(loginSuccessfulResponse);
            } else {
                isLoginInProgress = false;
                const loginFailedResponse = document.createElement("div");
                loginFailedResponse.className = "output-text";
                loginFailedResponse.textContent = "Inicio de sesión fallido. Por favor, inténtelo de nuevo.";
                outputElement.appendChild(loginFailedResponse);
            }
        }
    } else if (isLoginInProgress) {
        username = command.trim();
        isLoginInProgress = false;

        const usernameEnteredResponse = document.createElement("div");
        usernameEnteredResponse.className = "output-text";
        usernameEnteredResponse.textContent = `Nombre de usuario: ${username}. Por favor, ingrese su contraseña.`;
        outputElement.appendChild(usernameEnteredResponse);
    } else {
        const defaultResponse = document.createElement("div");
        defaultResponse.className = "output-text";
        defaultResponse.textContent = "Comando no reconocido. Escriba 'ayuda' para obtener asistencia.";
        outputElement.appendChild(defaultResponse);
    }

    outputElement.scrollTop = outputElement.scrollHeight;
}




document.addEventListener("click", function () {
    inputElement.focus();
});