document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const determinant = document.getElementById('determinant');
    const func = document.getElementById('function');
    const errorMessage = document.getElementById('error-message');
    const resultsBody = document.getElementById('results-body');
    
    // Сбрасываем предыдущие ошибки
    determinant.classList.remove('error');
    func.classList.remove('error');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    // Функция проверки последовательности строк
    const validateSequence = (value, fieldName) => {
        // Проверка на пустую строку
        if (!value.trim()) {
            return { valid: false, message: `${fieldName}: Введите хотя бы одну строку!` };
        }
        
        // Разбиваем на строки по запятым, обрезаем пробелы, удаляем пустые элементы
        const strings = value.split(',').map(s => s.trim()).filter(s => s !== '');
        
        // Проверка, что если строк больше одной, то в вводе была хотя бы одна запятая
        if (strings.length > 1 && !/,/.test(value)) {
            return { valid: false, message: `${fieldName}: Между строками должна быть хотя бы одна запятая!` };
        }
        
        // Проверка каждой строки
        for (const str of strings) {
            // Проверка на запрещённые символы (пробелы внутри строк)
            if (/\s/.test(str)) {
                return { valid: false, message: `${fieldName}: Строка "${str}" содержит пробелы!` };
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
    
    // Если все проверки пройдены - добавляем данные в таблицу
    const row = document.createElement('tr');
    
    const detCell = document.createElement('td');
    detCell.textContent = validationDet.strings.join(', ');
    row.appendChild(detCell);
    
    const funcCell = document.createElement('td');
    funcCell.textContent = validationFunc.strings.join(', ');
    row.appendChild(funcCell);
    
    resultsBody.appendChild(row);
    
    // Очищаем поля ввода
    determinant.value = '';
    func.value = '';
});