const loginForm = document.getElementById("loginForm") as HTMLFormElement;
loginForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/protected";
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
});

const signupForm = document.getElementById("signup-form") as HTMLFormElement;
signupForm.addEventListener("submit", function (event: Event) {
  event.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
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
