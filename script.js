document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const determinant = document.getElementById('determinant');
    const func = document.getElementById('function');
    const errorMessage = document.getElementById('error-message');
    
    // Сбрасываем предыдущие ошибки
    determinant.classList.remove('error');
    func.classList.remove('error');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    // Функция проверки последовательности
    const validateSequence = (value, fieldName) => {
        // Проверка на нечисловые символы (кроме пробелов и запятых)
        if (/[^\d\s,]/.test(value)) {
            return { valid: false, message: `${fieldName}: Допустимы только цифры, пробелы и запятые!` };
        }
        
        // Удаляем пробелы в начале и конце
        const trimmedValue = value.trim();
        
        // Проверка на наличие хотя бы одного числа
        if (!/\d/.test(trimmedValue)) {
            return { valid: false, message: `${fieldName}: Введите хотя бы одно число!` };
        }
        
        // Проверка на пробелы между числами без запятых
        if (/(?<=\d)\s+(?=\d)/.test(trimmedValue)) {
            return { valid: false, message: `${fieldName}: Между числами должны быть запятые!` };
        }
        
        // Извлекаем все числа (игнорируя пробелы и лишние запятые)
        const numbers = trimmedValue.split(/[\s,]+/)
            .filter(num => num !== '' && !isNaN(num))
            .map(num => parseInt(num, 10));
        
        // Проверка каждого числа
        for (const num of numbers) {
            if (num < 1 || num > 254) {
                return { valid: false, message: `${fieldName}: Числа должны быть от 1 до 254!` };
            }
        }
        
        return { valid: true, numbers: numbers };
    };
    
    // Проверка обоих полей
    const validationDet = validateSequence(determinant.value, 'Детерминанта');
    const validationFunc = validateSequence(func.value, 'Функция');
    
    // Собираем ошибки
    const errors = [];
    if (!validationDet.valid) errors.push(validationDet.message);
    if (!validationFunc.valid) errors.push(validationFunc.message);
    
    // Показываем ошибки
    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
        errorMessage.style.display = 'block';
        
        if (!validationDet.valid) determinant.classList.add('error');
        if (!validationFunc.valid) func.classList.add('error');
        return;
    }
    
    // Если все проверки пройдены
    alert(`Проверка успешна!\nДетерминанта: ${validationDet.numbers.join(', ')}\nФункция: ${validationFunc.numbers.join(', ')}`);
});