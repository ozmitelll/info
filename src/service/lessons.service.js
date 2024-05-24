
export const createLesson = async (discipline_id, data)=>{
    const config = {
        method:'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:data.name,
            lesson_number:data.lesson_number,
            type_of_lesson:data.type_of_lesson
        })
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/discipline/${discipline_id}/lessons`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

export const deleteLesson = async (discipline_id, id)=>{
    const config = {
        method:'DELETE',
        mode: "cors",
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/discipline/${discipline_id}/lessons/${id}`, config);

        if (!response.ok) {
            console.error(`Error ${response.status}:`, await response.text());
        }

        return response.status;
    } catch (error) {
        console.error('Fetch error:', error);
        return 500;
    }
}

