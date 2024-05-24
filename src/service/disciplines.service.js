
export const getAll = async () =>{
    const config = {
        method:'GET',
        mode: "cors",
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/disciplines", config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const createDiscipline = async (data) => {
    const config = {
        method:'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:data.name,
            description:data.description
        })
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/discipline", config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}


export const deleteDiscipline = async (id)=>{
    const config = {
        method:'DELETE',
        mode: "cors",
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/discipline/${id}`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.status;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const getDisciplinesByLetter = async (letter) =>{
    const config = {
        method:'GET',
        mode: "cors",
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/disciplines/by_letter?start_letter=${letter}`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

