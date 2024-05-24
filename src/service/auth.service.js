import {jwtDecode} from "jwt-decode";
export const isAuth = () => {
    return !!localStorage.getItem('authToken');
}
export const isAdmin = () =>{
    const token = localStorage.getItem('authToken')
    if (token) {
        const decoded = jwtDecode(token)
        return (decoded.is_admin === true)
    }
}
export const registrateUser = async (data) =>{
    const config = {
        method:'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": data.login,
            "password": data.password,
            "email": data.email,
            "name": data.firstName,
            "surname": data.middleName,
            "thirdname": data.lastName,
            "is_admin": false
        })
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/users", config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.status;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const authUser = async (data) => {
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("username", data.login);
    urlEncodedData.append("password", data.password);
    const config = {
        method:'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/token", config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }
        const responseData = await response.json();
        localStorage.setItem('authToken', responseData.access_token)
        return response.status;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const getUsers = async () => {
    const config = {
        method:'GET',
        mode: "cors",
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/users", config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const deleteUser = async (id) => {
    const config = {
        method:'DELETE',
        mode: "cors",
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/auth/users/${id}`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const updateUser = async (id, data) => {
    const config = {
        method:'PUT',
        mode: "cors",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            username:data.username,
            email:data.email,
            is_admin:data.is_admin,
            name: data.name,
            surname: data.surname,
            thirdname: data.thirdname
        })
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/auth/users/${id}`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}