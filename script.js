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
        // Проверка на пустую строку после удаления всех разделителей
        if (!value.replace(/[,\s]/g, '')) {
            return { valid: false, message: `${fieldName}: Введите хотя бы одну строку!` };
        }
        
        // Разбиваем на строки, учитывая разделители
        const strings = value.split(/[,\s]+/).filter(s => s !== '');
        
        // Проверка каждой строки
        for (const str of strings) {
            // Проверка на запрещённые символы (запятые или пробелы внутри строк)
            if (/[, ]/.test(str)) {
                return { valid: false, message: `${fieldName}: Строка "${str}" содержит запрещённые символы (пробел или запятую)!` };
            }
            
            // Проверка длины строки
            if (str.length > 5) {
                return { valid: false, message: `${fieldName}: Строка "${str}" слишком длинная (макс. 5 символов)!` };
            }
        }
        
        return { valid: true, strings: strings };
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