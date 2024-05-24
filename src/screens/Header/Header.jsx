import {isAdmin, isAuth} from "../../service/auth.service";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken')
    }
    return (
        <header
            key="1"
            className="fixed inset-x-0 top-0 h-16 z-50 flex items-center px-4 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 backdrop-filter dark:border-gray-800 dark:bg-gray-950/90"
        >
            <nav className="flex-1 text-white flex items-center justify-between px-12">
                <a href="/">
                    <p>Інформаційно-довідкова система навчальної частини факультету ВВНЗ</p>
                </a>
                <div className="flex-1 flex justify-end items-center space-x-8">
                    <a className="font-semibold relative hover:text-blue-500 group" href="/about">
                        Про систему
                        <span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                    </a>
                    <a className="font-semibold relative hover:text-blue-500 group" href="/disciplines">
                        Дисципліни
                        <span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                    </a>
                    <a className="font-semibold relative hover:text-blue-500 group" href="/faculty">
                        Факультет
                        <span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                    </a>
                    {(isAuth() && isAdmin())?
                        <a className="font-semibold relative hover:text-blue-500 group" href="/dashboard">
                            Керування
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                        </a> : <></>}
                    {isAuth() ?
                        <a href={'/login'} className="font-semibold relative hover:text-blue-500 group"
                           onClick={handleLogout}>
                            Вийти
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                        </a> :
                        <a className="font-semibold relative hover:text-blue-500 group" href={'/login'}>
                            Увійти
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform transform origin-bottom scale-x-0 group-hover:scale-x-100 group-hover:bg-blue-500"/>
                        </a>
                    }
                </div>

            </nav>
        </header>
    )
}

export default Header