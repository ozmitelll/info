import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDisciplinesByLetter} from "../../service/disciplines.service";

const Discipline = () => {
    const {letter} = useParams();
    const [disciplines, setDisciplines] = useState([])
    console.log(letter)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allDisciplines = await getDisciplinesByLetter(letter);
                setDisciplines(allDisciplines);
            } catch (error) {
                console.log("Failed to fetch disciplines:", error.message);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={'h-screen flex flex-col items-center justify-start'}>
            <h1 className="text-xl text-center font-bold pt-20">Дисципліни назва, яких починається на літеру <b>≪{letter}≫</b></h1>
            <div className="w-full p-4">
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
    );
}

export default Discipline