    import {Input} from "../../components/ui/input";
    import {Label} from "../../components/ui/label";
    import {useHistory} from "react-router-dom";
    import React, {useState} from "react";
    import {Button} from "../../components/ui/button";
    import {toast} from "react-toastify";
    import {authUser} from "../../service/auth.service";

    const Login = () => {
        const history = useHistory();
        const [formData, setFormData] = useState({
            login:'',
            password:''
        })

        const clearForm = () => {
            setFormData({
                login: '',
                password: '',
            })
        };
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const validateForm = () => {
            const { login, password} = formData;
            if (!login || !password ) {
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
            const response = await authUser(formData)
            if(response===200){
                clearForm();
                history.push('/dashboard')
                window.location.reload()
            }
            else {
                toast.error('Користувач не існує або помилка серверу!')
            }
        };

        return (
            <div className={'border-2 border-[#F7DCB9] bg-[#DEAC80] rounded-xl p-8 flex flex-col gap-4 justify-center items-center'}>
                <p className={'text-center text-2xl'}>Вхід до панелі адміністратора</p>
                <div className={'w-full'}>
                    <Label>Логін</Label>
                    <Input name="login" onChange={handleChange} className={'mt-1'}/>
                </div>
                <div className={'w-full'}>
                    <Label>Пароль</Label>
                    <Input type="password" name="password" onChange={handleChange} className={'mt-1'}/>

                </div>
                <Button
                    onClick={handleSubmit}
                    className={'mt-6 w-2/4 bg-[#B5C18E] border-2 text-black hover:bg-emerald-200'}>Авторизуватись</Button>
            </div>
        )
    }

    export default Login