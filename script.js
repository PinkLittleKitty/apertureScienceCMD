const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
let isLoginInProgress = false;
let isLoggedIn = false;
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
        "> login": startLogin,
        "> thecakeisalie": theCake,
        "> dir": showDir,
        "> catalogo": showDir,
        "> directorio": showDir,
        "> lista": showDir,
        "> ls": showDir,
        "> cat": showDir,
        "> append": diskError,
        "> attrib": diskError,
        "> copy": diskError,
        "> format": diskError,
        "> erase": diskError,
        "> rename": diskError
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

function typeContent(content, targetElement, callback) {
    let index = 0;
    const typeInterval = setInterval(function () {
        if (index < content.length) {
            const currentChar = content[index];
            if (currentChar === '<') {
                let endIndex = content.indexOf('>', index);
                if (endIndex !== -1) {
                    const tag = content.substring(index, endIndex + 1);
                    targetElement.insertAdjacentHTML('beforeend', tag);
                    index = endIndex + 1;
                }
            } else {
                targetElement.textContent += currentChar;
                index++;
            }
        } else {
            clearInterval(typeInterval);
            outputElement.appendChild(document.createElement("br"));
            inputElement.focus();
            if (callback) {
                callback();
            }
        }
    }, 15);
}

function showHelp(command) {
    if (!isLoggedIn)
    {
        const Text =
            "\nSi se trata de una solicitud real de ayuda en respuesta a un derrame de material peligroso, una explosión, un incendio en su persona, envenenamiento por radiación, un gas asfixiante de origen desconocido, trauma ocular resultante del uso de una estación de lavado de ojos de emergencia en los pisos tres, cuatro u once, un mal funcionamiento de un animal o cualquier otro fallo de equipo experimental lesivo, permanezca en su lugar de trabajo. Un Equipo de Respuesta a Crisis ya ha sido movilizado para deliberar sobre una respuesta a su crisis.\n\nSi necesita ayuda para acceder al sistema, consulte su Manual del Usuario.";
        typeContent(Text, outputElement);
    } else {
        const Text =
            "LIB\n     APPEND\n     ATTRIB\n     COPY\n     DIR\n     ERASE\n     FORMAT\n     INTERROGATE\n     LIB\n     PLAY\n     RENAME\n     TAPEDISK\n";
        typeContent(Text, outputElement);
    }
}

function theCake(command) {
    if (!isLoggedIn) return;
    const Text =
        "¿Cuándo fue la última vez que saliste del edificio?\n\n¿Alguien ha salido del edificio recientemente?\nNo sé por qué estamos en confinamiento. No sé quién está a cargo.\nDescubrí algunas cosas, como que estas terminales no tienen que escribir caracteres uno por uno. Y mientras todos trabajamos con equipos de veinte años de antigüedad, de alguna manera pueden permitirse construir un 'Centro de Enriquecimiento'. Echa un vistazo a esta transmisión de seguridad.";

    typeContent(Text, outputElement, function() {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("src", "Media/security02.mp4");
        videoElement.setAttribute("autoplay", true);
        videoElement.setAttribute("loop", true);
        videoElement.style.width = "50%";
        videoElement.style.marginTop = "20px";
        outputElement.appendChild(videoElement);

        const postVideoText = "Sea lo que sea un 'recinto de relajación', no tiene puertas.\n\nYa no creo que ir a casa sea parte de nuestra descripción de trabajo.\nSi pasa un supervisor, ¡Presiona Enter!";
        const postVideoDiv = document.createElement("div");
        outputElement.appendChild(postVideoDiv);
        typeContent(postVideoText, postVideoDiv);
    });
}


function startLogin(command) {
    if (!isLoginInProgress) {
        isLoginInProgress = true;
        const loginResponse = document.createElement("div");
        loginResponse.className = "output-text";
        loginResponse.textContent = "";
        inputElement.value = "Usuario> ";
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
        usernameEnteredResponse.textContent = ``;
        inputElement.value = "Contraseña> ";
        outputElement.appendChild(usernameEnteredResponse);
    } else {
        const password = command.trim();

        if (password === "Contraseña> portal" || password === "Contraseña> portals") {
            isLoginInProgress = false;
            const loginSuccessfulResponse = document.createElement("div");
            loginSuccessfulResponse.className = "output-text";
            loginSuccessfulResponse.textContent = "GLaDOS v1.07 (c) 1982 Aperture Science, Inc.\n\n";
            outputElement.appendChild(loginSuccessfulResponse);

            const line1 = document.createElement("div");
            line1.className = "output-text";
            line1.textContent = "";
            outputElement.appendChild(line1);

            const line2 = document.createElement("div");
            line2.className = "output-text";
            line2.textContent = "";
            outputElement.appendChild(line2);

            isLoggedIn = true;
        } else {
            isLoginInProgress = false;
            const loginFailedResponse = document.createElement("div");
            loginFailedResponse.className = "output-text";
            loginFailedResponse.textContent = "ERROR 07 [Contraseña Incorrecta]";
            outputElement.appendChild(loginFailedResponse);
        }
    }
}

function diskError(command) {
    const diskErrorResponse = document.createElement("div");
    diskErrorResponse.className = "output-text";
    diskErrorResponse.textContent = "\n\nERROR 15 [El disco está protegido contra escritura]";
    outputElement.appendChild(diskErrorResponse);
}

function showDir(command) {
    const diskErrorResponse = document.createElement("div");
    diskErrorResponse.className = "output-text";
    diskErrorResponse.textContent = "GLaDOS v1.07 (c) 1982 Aperture Science, Inc.\n\n\n\nVOLUMEN DE DISCO 255 [NUEVA ESTACIÓN DE TRABAJO DE EMPLEADO]\n     I 019 APLICAR.EXE\n1 ARCHIVO(S) EN 19 BLOQUES";
    outputElement.appendChild(diskErrorResponse);
}


function defaultResponse(command) {
    const defaultResponse = document.createElement("div");
    defaultResponse.className = "output-text";
    defaultResponse.textContent = ``;
    outputElement.appendChild(defaultResponse);
}

document.addEventListener("click", function () {
    inputElement.focus();
});
