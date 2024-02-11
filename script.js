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

        processCommand(command);
    }
});

function processCommand(command) {
    const commands = {
        "> ayuda": showHelp,
        "> login": startLogin
    };

    const commandFunction = commands[command.toLowerCase()];
    if (commandFunction) {
        commandFunction(command);
    } else if (isLoginInProgress) {
        login(command);
    } else {
        defaultResponse(command);
    }
}

function typeText(text, targetElement) {
    let index = 0;
    const typeInterval = setInterval(function () {
        if (index < text.length) {
            targetElement.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            outputElement.appendChild(document.createElement("br"));
            inputElement.focus();
        }
    }, 15);
}

function showHelp(command) {
    const helpText =
        "Si se trata de una solicitud real de ayuda en respuesta a un derrame de material peligroso, una explosión, un incendio en su persona, envenenamiento por radiación, un gas asfixiante de origen desconocido, trauma ocular resultante del uso de una estación de lavado de ojos de emergencia en los pisos tres, cuatro u once, un mal funcionamiento de un animal o cualquier otro fallo de equipo experimental lesivo, permanezca en su lugar de trabajo. Un Equipo de Respuesta a Crisis ya ha sido movilizado para deliberar sobre una respuesta a su crisis.\n\nSi necesita ayuda para acceder al sistema, consulte su Manual del Usuario.";
    typeText(helpText, outputElement);
}

function startLogin(command) {
    if (!isLoginInProgress) {
        isLoginInProgress = true;
        const loginResponse = document.createElement("div");
        loginResponse.className = "output-text";
        loginResponse.textContent = "Por favor, introduzca su nombre de usuario.";
        outputElement.appendChild(loginResponse);
    } else {
        login(command);
    }
}

function login(command) {
    if (username === "") {
        username = command.trim();
        const usernameEnteredResponse = document.createElement("div");
        usernameEnteredResponse.className = "output-text";
        usernameEnteredResponse.textContent = `Nombre de usuario: ${username}. Por favor, ingrese su contraseña.`;
        outputElement.appendChild(usernameEnteredResponse);
    } else {
        const password = command.trim();

        if (password === "> portal" || password === "> portals") {
            isLoginInProgress = false;
            const loginSuccessfulResponse = document.createElement("div");
            loginSuccessfulResponse.className = "output-text";
            loginSuccessfulResponse.textContent = "Inicio de sesión correcto!";
            outputElement.appendChild(loginSuccessfulResponse);
        } else {
            isLoginInProgress = false;
            const loginFailedResponse = document.createElement("div");
            loginFailedResponse.className = "output-text";
            loginFailedResponse.textContent = "Inicio de sesión fallido. Por favor, inténtelo de nuevo.";
            outputElement.appendChild(loginFailedResponse);
        }
    }
}

function defaultResponse(command) {
    const defaultResponse = document.createElement("div");
    defaultResponse.className = "output-text";
    defaultResponse.textContent = `Comando '${command}' no reconocido. Escriba 'ayuda' para obtener asistencia.`;
    outputElement.appendChild(defaultResponse);
}

document.addEventListener("click", function () {
    inputElement.focus();
});
