(function() {
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    // ... (остальной код для ПКМ меню и модалки оставляем без изменений) ...

    // 4. ЖИВАЯ ФИЛЬТРАЦИЯ
    function handleFilterChange(e) {
        // Проверяем ID или Name элемента
        if (e.target && (e.target.id === 'P_FILTER' || e.target.name === 'P_FILTER')) {
            
            var newValue = e.target.value;
            console.log('Фильтр изменен на:', newValue); // Для отладки
            
            if (window.jsAPI) {
                // 1. Записываем значение в сессию
                jsAPI.setItem('P_FILTER', newValue);
                // 2. Обновляем регион с карточками
                jsAPI.component.refresh('REGION_GEN_VUN5I');
            }
        }
    }

    // Ловим события change и input на фазе перехвата (true), чтобы XRAD не "съел" их
    document.addEventListener('change', handleFilterChange, true);
    document.addEventListener('input', handleFilterChange, true);

})();
