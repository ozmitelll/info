const About = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[#F7DCB9] p-4">
            <h1 className="text-4xl font-bold text-[#B99470] mb-8">Про Систему Управління Навчанням</h1>
            <div className="bg-white shadow-xl rounded-lg p-6 w-full">
                <h2 className="text-2xl font-semibold text-[#B99470]">Загальний огляд</h2>
                <p className="text-gray-700 mt-4">
                    Наша система управління навчанням дозволяє студентам і викладачам ефективно орієнтуватися у морі академічних дисциплін. Вона забезпечує швидкий доступ до всіх необхідних ресурсів для оптимізації навчального процесу.
                </p>
                <h3 className="text-xl font-semibold text-[#B5C18E] mt-6">Ключові особливості:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                    <li>Легкий доступ до списку дисциплін і відповідних занять, що полегшує планування навчального процесу.</li>
                    <li>Можливість переглядати детальну інформацію про кожну дисципліну та заняття, включаючи їх описи, цілі та викладачів.</li>
                    <li>Інтуїтивно зрозумілий інтерфейс, який забезпечує швидке введення в курс справ з мінімальним навчанням для користувача.</li>
                    <li>Автоматизація процесів реєстрації на курси та управління навчальними матеріалами.</li>
                    <li>Інтеграція з іншими системами і сервісами, що збільшує можливості для залучення різноманітних освітніх ресурсів.</li>
                    <li>Підтримка мобільних пристроїв, що дозволяє користувачам взаємодіяти з системою з будь-якого місця і в будь-який час.</li>
                </ul>
                <h3 className="text-xl font-semibold text-[#B5C18E] mt-6">Переваги для користувачів:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                    <li>Збільшення продуктивності навчання завдяки централізованому доступу до навчальних матеріалів і ресурсів.</li>
                    <li>Економія часу та зусиль, зниження рівня стресу під час пошуку інформації або реєстрації на курси.</li>
                    <li>Покращення організації навчального процесу, легше відстеження академічних обов’язків і вимог.</li>
                    <li>Сприяння колаборативному навчанню та підвищення ефективності комунікацій між студентами і викладачами.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
