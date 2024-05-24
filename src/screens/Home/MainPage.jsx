const MainPage = () => {
    return (
        <div className=" w-full flex flex-col items-center justify-center min-h-screen bg-[#F7DCB9] p-4">
            <h1 className="text-4xl font-bold text-[#B99470] mb-8">Ласкаво просимо до факультету №2!</h1>
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl">
                <h2 className="text-2xl font-semibold text-[#B99470]">Факультет Інформаційних Технологій</h2>
                <div className="mt-4 space-y-4">
                    <div className="p-4 bg-[#DEAC80] border-l-4 border-[#B5C18E]">
                        <h3 className="text-xl font-semibold text-black">Спеціальність: Комп'ютерні науки</h3>
                        <p className="text-gray-700">
                            Спеціальність комп'ютерних наук забезпечує глибоке розуміння програмування, алгоритмів та обчислювальної техніки. Студенти навчаються розробляти інноваційні програмні рішення та технологічні продукти, що відповідають сучасним вимогам ринку.
                        </p>
                    </div>
                    <div className="p-4 bg-[#DEAC80] border-l-4 border-[#B5C18E]">
                        <h3 className="text-xl font-semibold text-black">Спеціальність: Автоматизовані системи управління</h3>
                        <p className="text-gray-700">
                            Ця спеціальність готує фахівців, здатних проектувати та імплементувати комплексні системи автоматизації та управління. Навчання зосереджено на створенні систем, які можуть автоматизувати процеси в різноманітних галузях промисловості та бізнесу.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
