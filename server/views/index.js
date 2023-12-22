const userId = document.querySelector("#userId");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");

const getUserBtn = document.querySelector("#getUserBtn");
const postUserBtn = document.querySelector("#postUserBtn");
const deleteUserBtn = document.querySelector("#deleteUserBtn");
const authRefreshBtn = document.querySelector("#authRefresh");
const authLogOutBtn = document.querySelector("#authLogOut");

async function getUserById() {
  try {
    const id = userId.value;
    const response = await fetch(`/user/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("error from getUserBtn:", err.message);
  }
}
async function postUserById() {
  try {
    const id = userId.value;
    const name = userName.value;
    const email = userEmail.value;
    const response = await fetch(`/user/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        email: email,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("error from postUserById:", err.message);
  }
}
async function deleteUserById() {
  try {
    const id = userId.value;
    console.log(id);
    const resolve = await fetch(`/user/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await resolve.json();
    console.log(data);
  } catch (err) {
    console.error("error from deleteUserById:", err.message);
  }
}
async function tokenRefresh() {
    try {
        const response = await fetch("/auth/refresh", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        console.log(data);
    } catch(err) {console.error("error from refresh token function", err.message)}
}
async function tokenDelete() {
    try {
        const response = await fetch("/auth/refresh", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "COntent-Type": "application/json",
            }
        })
        const data = await response.json();
        console.log(data);
    } catch(err) {console.error("error from delete token function", err.message)}
}

getUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getUserById();
});
postUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  postUserById();
});
deleteUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteUserById();
});
authRefreshBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tokenRefresh();
});
authLogOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tokenDelete();
});
