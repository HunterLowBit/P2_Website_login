"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = document.getElementById("username")
        .value;
    const password = document.getElementById("password")
        .value;
    try {
        const response = yield fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = yield response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/protected";
        }
        else {
            alert(data.error);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password")
        .value;
    // Aqui você pode fazer uma requisição para o servidor enviar os dados de cadastro
    // Exemplo usando fetch:
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        // Aqui você pode exibir uma mensagem de sucesso ou redirecionar para outra página
    })
        .catch((error) => {
        console.error(error);
        // Aqui você pode exibir uma mensagem de erro
    });
});
