import React, {useEffect, useState} from "react";
import {createDiscipline, deleteDiscipline, getAll} from "../../service/disciplines.service";
import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {Textarea} from "../../components/ui/textarea";
import {Button} from "../../components/ui/button";
import {toast} from "react-toastify";
import {createLesson, deleteLesson} from "../../service/lessons.service";
import {deleteUser, getUsers, updateUser} from "../../service/auth.service";
import {XIcon} from "lucide-react";

const Dashboard = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [currentView, setCurrentView] = useState("viewDisciplines");
    const [selectedDisciplineID, setSelectedDisciplineID] = useState(null)
    const [disciplineForm, setDisciplineForm] = useState({
        name: '',
        description: ''
    })
    const [showModal, setShowModal] = useState(false);
    const [newLessonForm, setNewLessonForm] = useState({
        lesson_number: '',
        name: '',
        type_of_lesson: 'Л'
    });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        is_admin: false,
        name: '',      // New field for name
        surname: '',   // New field for surname
        thirdname: ''  // New field for thirdname
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allDisciplines = await getAll();
                setDisciplines(allDisciplines);
                if (disciplines.length > 0) {
                    setSelectedDisciplineID(allDisciplines[0].id)
                    setLessons(allDisciplines[0].lessons)
                } else {
                    setLessons([])
                }

            } catch (error) {
                console.log("Failed to fetch disciplines:", error.message);
            }
        };
        const fetchUsers = async () => {
            // Assume there's an API service function to fetch users
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        };

        fetchUsers();

        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleUserSelect = (userId) => {
        const user = users.find(u => u.id === userId);
        setSelectedUser(user);
        setUserForm({
            username: user.username,
            email: user.email,
            is_admin: user.is_admin,
            name: user.name,      // New field for name
            surname: user.surname,   // New field for surname
            thirdname: user.thirdname  // New field for thirdname
        });
    };


    const handleUserChange = (e) => {
        const {name, value, type, checked} = e.target;
        setUserForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmitUserUpdate = async () => {
        // Correctly sending all necessary fields
        const response = await updateUser(selectedUser.id, userForm);
        if (response.status === 200) {
            toast.success('Користувач успішно оновлений!');
            setUsers(prevUsers => prevUsers.map(u => u.id === selectedUser.id ? {...u, ...userForm} : u));
            setSelectedUser(null);
            setUserForm({username: '', email: '', is_admin: false, name: '', surname: '', thirdname: ''});
        } else {
            toast.error('Помилка оновлення користувача!');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
            const response = await deleteUser(userId);
            if (response.status === 200) {
                toast.success('Користувач був успішно видалений!');
                setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
            } else {
                toast.error('Помилка видалення користувача!');
            }
        }
    };
    const clearForm = () => {
        setDisciplineForm({
            name: '',
            description: '',
        })
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
        if (view === "addLesson" && disciplines.length > 0 && lessons.length === 0) {
            // This condition might adjust depending on your application's logic
            setLessons(disciplines[0].lessons);
            setSelectedDisciplineID(disciplines[0].id)
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDisciplineForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const validateForm = () => {
        const {name, description} = disciplineForm;
        if (!name || !description) {
            return 'Всі поля повинні бути заповнені!';
        }
        return '';
    };
    const handleSubmit = async () => {
        const message = validateForm();
        if (message) {
            toast.error(message);
            return;
        }
        const response = await createDiscipline(disciplineForm)
        if (response.status === 200) {
            const result = await response.json()
            setDisciplines(prevDisciplines => [...prevDisciplines, result])
            toast.success(`Дисципліну ${disciplineForm.name} було успішно створено!`)
            clearForm();
        } else {
            toast.error('Дана дисципліна вже існує або помилка серверу!')
        }
    };

    const handleDisciplineSelect = async (e) => {
        const disciplineId = e.target.value;
        setSelectedDisciplineID(disciplines[disciplineId].id)
        setLessons(disciplines[disciplineId].lessons)
    };


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewLessonForm({
            lesson_number: '',
            name: '',
            type_of_lesson: 'Л'
        });
    };

    const handleLessonChange = (e) => {
        const {name, value} = e.target;
        setNewLessonForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitLesson = async (id) => {
        // Validation can be added here
        if (!newLessonForm.name || !newLessonForm.lesson_number || !newLessonForm.type_of_lesson) {
            toast.error('Всі поля мають бути заповнені!');
            return;
        }

        const response = await createLesson(selectedDisciplineID, newLessonForm);
        if (response.status === 200) {
            const createdLesson = await response.json(); // Assuming the API returns the created lesson.
            const cLesson = {
                number: createdLesson.lesson_number,
                ...createdLesson
            }
            const updatedDisciplines = disciplines.map(discipline => {
                if (discipline.id === selectedDisciplineID) {
                    return {...discipline, lessons: [...discipline.lessons, cLesson]};
                }
                return discipline;
            });
            setDisciplines(updatedDisciplines);
            setLessons(prevLessons => [...prevLessons, cLesson]);
            toast.success('Заняття було успішно додане!');
            closeModal();
        } else {
            toast.error('Помилка при додаванні заняття!');
        }
    };


    const handleLessonDelete = async (lessonId) => {
        if (window.confirm('Ви впевнені, що хочете видалити це заняття?')) {
            try {
                const response = await deleteLesson(selectedDisciplineID, lessonId); // Assuming deleteLesson is your API call function
                if (response === 200) {
                    toast.success('Заняття було успішно видалено!');
                    const updatedDisciplines = disciplines.map(discipline => {
                        if (discipline.id === selectedDisciplineID) {
                            return {
                                ...discipline,
                                lessons: discipline.lessons.filter(lesson => lesson.id !== lessonId)
                            };
                        }
                        return discipline;
                    });
                    setDisciplines(updatedDisciplines);
                    setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));

                } else {
                    toast.error('Помилка при видаленні заняття!');
                }
            } catch (error) {
                toast.error('Помилка при видаленні заняття!');
            }
        }
    };

    const handleDisciplineDelete = async (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цю дисципліну?')) {
            try {
                const response = await deleteDiscipline(id);
                if (response === 200) {
                    toast.success('Дисципліну було успішно видалено!');
                    setDisciplines(prevDisciplines => prevDisciplines.filter(discipline => discipline.id !== id));
                }
            } catch (error) {
                console.log('тут кетч')
                toast.error('Помилка при видаленні дисципліни!');
            }
        }
    };

    return (
        <div className={'w-screen h-screen flex items-start p-16'}>
            <div
                className={'flex mt-16 bg-[#F7DCB9] w-1/6 flex-col items-center justify-center border-r-2 border-black'}>
                <div
                    onClick={() => handleViewChange("viewDisciplines")}
                    className={'w-full hover:bg-orange-300 ease-in-out transition .2s cursor-pointer'}>
                    <p className={'p-2 text-center'}>Дисципліни</p>
                </div>
                <div
                    onClick={() => handleViewChange("addDiscipline")}
                    className={'w-full hover:bg-orange-300 ease-in-out transition .2s cursor-pointer'}>
                    <p className={'p-2 text-center'}>Додати дисципліну</p>
                </div>
                <div
                    onClick={() => handleViewChange("addLesson")}
                    className={'w-full hover:bg-orange-300 ease-in-out transition .2s cursor-pointer'}>
                    <p className={'p-2 text-center'}>Додати зміст дисципліни</p>
                </div>
                <div
                    onClick={() => handleViewChange("viewSettings")}
                    className={'w-full hover:bg-orange-300 ease-in-out transition .2s cursor-pointer'}>
                    <p className={'p-2 text-center'}>Налаштування</p>
                </div>
            </div>
            <div className={'w-5/6 mt-16 h-full'}>
                {renderContent(users, handleUserSelect, handleDeleteUser, selectedUser, userForm, handleUserChange, handleSubmitUserUpdate, handleDisciplineDelete, handleLessonDelete, submitLesson, showModal, newLessonForm, openModal, closeModal, handleLessonChange, currentView, disciplines, handleChange, handleSubmit, disciplineForm, handleDisciplineSelect, lessons)}
            </div>
        </div>
    );
};

const renderContent = (users, handleUserSelect, handleDeleteUser, selectedUser, userForm, handleUserChange, handleSubmitUserUpdate, handleDisciplineDelete, handleLessonDelete, submitLesson, showModal, newLessonForm, openModal, closeModal, handleLessonChange, view, disciplines, handleChange, handleSubmit, disciplineForm, handleDisciplineSelect, lessons) => {
    switch (view) {
        case "viewDisciplines":
            return disciplines.length > 0 ? renderDisciplinesTable(disciplines, handleDisciplineDelete) :
                <p>Disciplines not found!</p>;
        case "addDiscipline":

            return (
                <div className="flex bg-[#F7DCB9] flex-col items-center justify-center">
                    <h2 className="text-xl mb-4 pt-4">Додати нову дисципліну</h2>
                    <div className={'flex items-start justify-start w-full gap-4'}>
                        <div className={'w-2/4 p-4'}>
                            <Label>Назва дисципліни</Label>
                            <Input name={'name'} placeholder={'Назва дисципліни'} value={disciplineForm.name}
                                   onChange={handleChange}
                                   className={'mt-1 bg-[#DEAC80] border-0'} type={'text'}/>
                        </div>
                        <div className={'w-full p-4'}>
                            <Label>Опис дисципліни</Label>
                            <Textarea name={'description'} placeholder={'Опис дисципліни'}
                                      value={disciplineForm.description} onChange={handleChange}
                                      className={'mt-1 bg-[#DEAC80] border-0 resize-none h-[300px]'} type={'text'}/>
                        </div>
                    </div>
                    <div className={'flex items-start justify-start w-full p-4'}><Button onClick={handleSubmit}
                                                                                         className={'bg-[#B5C18E] border-2 text-black hover:bg-emerald-500'}>Створити
                        дисципліну</Button></div>

                </div>
            );
        case "viewSettings":
            return renderUserSettings(users, handleUserSelect, handleDeleteUser, selectedUser, userForm, handleUserChange, handleSubmitUserUpdate); // Placeholder, implement actual content
        case "addLesson":
            return (
                <div className="flex flex-col items-center justify-center w-full p-4 bg-[#F7DCB9]">
                    <h2 className="text-xl mb-4">Додати зміст до дисципліни</h2>
                    <select
                        onChange={(e) => handleDisciplineSelect(e)}
                        className="bg-[#DEAC80] p-2 rounded-lg"
                    >
                        <option value="" disabled={true}>Виберіть дисципліну</option>
                        {disciplines.map((discipline, index) => (
                            <option key={index} value={index}>
                                {discipline.name}
                            </option>
                        ))}
                    </select>
                    {lessons.length > 0 ? (
                        <div className="mt-4 w-full">
                            <h3 className="text-lg mb-4">Заняття:</h3>
                            <table className="w-full border-collapse bg-[#F7DCB9]">
                                <thead>
                                <tr className="text-black text-sm leading-normal">
                                    <th className="border px-4 py-2 text-lg text-left">Номер заняття</th>
                                    <th className="border px-4 py-2 text-lg text-left">Назва заняття</th>
                                    <th className="border px-4 py-2 text-lg text-center">Тип заняття</th>
                                </tr>
                                </thead>
                                <tbody>
                                {lessons.map((lesson, index) => (
                                    <tr key={index} className="hover:bg-orange-300 border-b border-gray-200">
                                        <td className="border px-4 py-2 text-left">
                                            <b>{lesson.number}</b>
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {lesson.name}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {lesson.type_of_lesson === 'Л' ? 'Лекція' :
                                                lesson.type_of_lesson === 'П' ? 'Практичне' :
                                                    lesson.type_of_lesson === 'С' ? 'Семінар' : ''}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <Button onClick={() => handleLessonDelete(lesson.id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                                Видалити
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-center">
                                <Button onClick={openModal}
                                        className="bg-[#B5C18E] border-2 text-black hover:bg-emerald-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Додати заняття
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 flex flex-col items-center justify-center bg-[#F7DCB9]">
                            <p className="p-2">Наразі заняття поки що немає!</p>
                            <Button onClick={openModal}
                                    className="bg-[#B5C18E] border-2 text-black hover:bg-emerald-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Додати заняття
                            </Button>
                        </div>
                    )}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">Додати заняття</h2>
                                    <button onClick={closeModal} className="text-lg font-semibold">&times;</button>
                                </div>
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <Label className="block text-gray-700 text-sm font-bold mb-2">Номер
                                            заняття</Label>
                                        <Input name="lesson_number" type={'text'} value={newLessonForm.lesson_number}
                                               onChange={handleLessonChange}
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                    </div>
                                    <div className="mb-4">
                                        <Label className="block text-gray-700 text-sm font-bold mb-2">Назва
                                            заняття</Label>
                                        <Input name="name" type={'text'} value={newLessonForm.name}
                                               onChange={handleLessonChange}
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                    </div>
                                    <div className="mb-6">
                                        <Label className="block text-gray-700 text-sm font-bold mb-2">Тип
                                            заняття</Label>
                                        <select name="type_of_lesson" value={newLessonForm.type_of_lesson}
                                                onChange={handleLessonChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                            <option value="Л">Лекційне (Л)</option>
                                            <option value="П">Практичне (П)</option>
                                            <option value="С">Семінар (С)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button onClick={() => submitLesson()}
                                                className="bg-[#B5C18E] border-2 text-black hover:bg-emerald-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline">Додати</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            );

        default:
            return <p>Content not found!</p>;
    }
};

const renderUserSettings = (users, handleUserSelect, handleDeleteUser, selectedUser, userForm, handleUserChange, handleSubmitUserUpdate) => (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-[#F7DCB9] h-fit">
        <h2 className="text-xl mb-4">Менеджмент користувачів</h2>
        <div className={'flex items-start justify-between w-full gap-8 '}>
            <div className="grid grid-cols-2 gap-8">
                {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 bg-[#DEAC80] rounded">
                        <span>{user.username} - {user.is_admin ? 'Адміністратор' : 'Користувач'}</span>
                        <div className={'flex'}>
                            <Button onClick={() => handleUserSelect(user.id)} className="mx-2">Редагувати</Button>
                            <Button onClick={() => handleDeleteUser(user.id)} className="bg-red-500"><XIcon/></Button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="p-4 bg-white rounded shadow w-1/3 ">
                    <div>
                        <Label>Логін:</Label>
                        <Input value={userForm.username} onChange={handleUserChange} name="username"/>
                    </div>
                    <div>
                        <Label>Пошта:</Label>
                        <Input value={userForm.email} onChange={handleUserChange} name="email"/>
                    </div>
                    <div>
                        <Label>Ім'я:</Label>
                        <Input value={userForm.name} onChange={handleUserChange} name="name" placeholder="Ім'я"/>
                    </div>
                    <div>
                        <Label>Призвіще:</Label>
                        <Input value={userForm.surname} onChange={handleUserChange} name="surname"
                               placeholder="Призвіще"/>
                    </div>
                    <div>
                        <Label>По батькові:</Label>
                        <Input value={userForm.thirdname} onChange={handleUserChange} name="thirdname"
                               placeholder="По батькові"/>
                    </div>
                    <div className={'flex items-center justify-around gap-4 pt-4'}>
                        <Label>
                            <input type="checkbox" checked={userForm.is_admin} onChange={handleUserChange}
                                   name="is_admin"/>
                            Адміністратор
                        </Label>
                        <Button onClick={handleSubmitUserUpdate}>Зберегти налаштування</Button>
                    </div>

                </div>
            )}
        </div>
    </div>
);

const renderDisciplinesTable = (disciplines, handleDisciplineDelete) => (
    <table className="w-full border-collapse bg-[#F7DCB9]">
        <thead>
        <tr>
            <th className="border px-4 py-2 text-lg text-left">Назва</th>
            <th className="border px-4 py-2 text-lg text-left">Опис</th>
            <th className="border px-4 py-2 text-lg text-left">Зміст дисципліни</th>
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
                        <p>Заняття ще не створені!</p>
                    )}
                </td>
                <td className="border px-4 py-2">
                    <Button onClick={() => handleDisciplineDelete(discipline.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                        Видалити
                    </Button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default Dashboard;
