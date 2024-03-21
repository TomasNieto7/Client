import users from "./data"

export const validateLogin = (name , password) => {
    const usuarioEncontrado = users.find(usuario => usuario.userName === name && usuario.password === password);
    return usuarioEncontrado ? usuarioEncontrado.rol : null;
}

