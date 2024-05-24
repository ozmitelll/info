import {Label} from "../../components/ui/label";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {useState} from "react";
import {toast} from "react-toastify";
import {registrateUser} from "../../service/auth.service";
import {useHistory} from "react-router-dom";

const Registration = () =>{
    const history = useHistory()
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: '',
        lastName: '',
        firstName: '',
        middleName: '',
        email:''
    });

    const clearForm = () => {
        setFormData({
            login: '',
            password: '',
            confirmPassword: '',
            lastName: '',
            firstName: '',
            middleName: '',
            email:''
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLoginRedirect = () => {
        history.push("/login");
    };

    const handleSubmit = async () => {
        const message = validateForm();
        if (message) {
            toast.error(message);
            return;
        }
        const response = await registrateUser(formData)
        if(response===200){
            toast.success('Користувача було успішно створено!')
            clearForm();

            handleLoginRedirect()
            window.location.reload()


        }
        else {
            toast.error('Користувач вже існує або помилка серверу!')
        }
    };
    const validateForm = () => {
        const { login, password, email, confirmPassword, lastName, firstName, middleName } = formData;
        if (!login || !password || !email ||!confirmPassword || !lastName || !firstName || !middleName) {
            return 'Всі поля повинні бути заповнені!';
        }
        if (password !== confirmPassword) {
            return 'Паролі не співпадають!';
        }
        return '';
    };
    return (
        <div
            className={'border-2 border-[#F7DCB9] bg-[#DEAC80] rounded-xl p-8 flex flex-col gap-4 justify-center items-center'}>
            <p className={'text-center text-2xl'}>Реєстрація у інформаційно-довідниковій системі</p>
            <div className={'flex gap-4'}>
                <div className={'w-full'}>
                    <Label>Логін</Label>
                    <Input name="login" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>Пароль</Label>
                    <Input type="password" name="password" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>Повторити пароль</Label>
                    <Input type="password" name="confirmPassword" onChange={handleChange} className={'mt-1'}/>
                </div>
            </div>
            <div className={'flex gap-4'}>
                <div className={'w-full'}>
                    <Label>Призвіще</Label>
                    <Input name="lastName" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>Ім'я</Label>
                    <Input name="firstName" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>По батькові</Label>
                    <Input name="middleName" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>Електронна пошта</Label>
                    <Input type={'email'} name="email" onChange={handleChange} className={'mt-1'}/>
                </div>
            </div>
            <Button onClick={handleSubmit}
                    className={'mt-6 w-2/4 bg-[#B5C18E] border-2 text-black hover:bg-emerald-200'}>
                Зареєструвати
            </Button>
        </div>
    )
}

export default Registration