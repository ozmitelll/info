import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAll} from "../../service/disciplines.service";

const DisciplinesPage = () => {
    const history = useHistory()
    const alphabet = 'АБВГҐДЕЄЖЗИІЇКЛМНОПРСТУФХЦЧШЮЯ'.split('');
    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allDisciplines = await getAll();
                setDisciplines(allDisciplines);
            } catch (error) {
                console.log("Failed to fetch disciplines:", error.message);
            }
        };

        fetchData();
    }, []);
    const handleLetterClick = (letter) => {
        // Here you can make a request or redirect
        history.push(`/disciplines/${letter}`);
        window.location.reload()
    };

    return (
        <div className={'h-screen flex flex-col items-center justify-start'}>
            <div className="p-4 pt-20">
                <h1 className="text-xl text-center font-bold mb-4">Оберіть першу букву для пошуку:</h1>
                <div className="flex space-x-2">
                    {alphabet.map((letter, index) => (
                        <button
                            key={index}
                            onClick={() => handleLetterClick(letter)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded">
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full">
                {disciplines && disciplines.length > 0 ? (
                    <table className="w-full border-collapse bg-[#F7DCB9]">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2 text-lg text-left">Назва</th>
                            <th className="border px-4 py-2 text-lg text-left">Опис</th>
                            <th className="border px-4 py-2 text-lg text-left">Пари</th>
                        </tr>
                        </thead>
                        <tbody>
                        {disciplines.map((discipline, index) => (
                            <tr key={index} className={'hover:bg-orange-300'}>
                                <td className="border px-4 py-2">{discipline.name}</td>
                                <td className="border px-4 py-2">{discipline.description || "Немає опису"}</td>
                                <td className="border px-4 py-2">
                                    {discipline.lessons && discipline.lessons.length > 0 ? (
                                        discipline.lessons.map((lesson, i) => (
                                            <p key={i} className="my-1">
                                                <b>{lesson.number} </b>{lesson.name} ({lesson.type_of_lesson[0].toUpperCase()})
                                            </p>
                                        ))
                                    ) : (
                                        <p>Пари ще не створені!</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Disciplines not found!</p>
                )}
            </div>

        </div>
    )
}

export default DisciplinesPage