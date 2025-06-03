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
    
    // Функция проверки последовательности строк
    const validateSequence = (value, fieldName) => {
        // Проверка на наличие запрещённых символов (пробел или запятая внутри строк)
        if (/[,\s]/.test(value.replace(/^[,\s]+|[,\s]+$/g, ''))) {
            return { valid: false, message: `${fieldName}: Строки не могут содержать пробелы или запятые!` };
        }
        
        // Удаляем лишние разделители в начале/конце
        const trimmedValue = value.replace(/^[,\s]+|[,\s]+$/g, '');
        
        // Проверка на пустую строку
        if (trimmedValue === '') {
            return { valid: false, message: `${fieldName}: Введите хотя бы одну строку!` };
        }
        
        // Разбиваем на строки
        const strings = trimmedValue.split(/[,\s]+/);
        
        // Проверка каждой строки
        for (const str of strings) {
            if (str.length === 0) continue;
            
            if (str.length > 5) {
                return { valid: false, message: `${fieldName}: Строка "${str}" слишком длинная (макс. 5 символов)!` };
            }
        }
        
        return { valid: true, strings: strings.filter(s => s !== '') };
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
    alert(`Проверка успешна!\nДетерминанта: ${validationDet.strings.join(', ')}\nФункция: ${validationFunc.strings.join(', ')}`);
});