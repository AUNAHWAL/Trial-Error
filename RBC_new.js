(function() {
    // Защита от двойной инициализации
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    document.addEventListener('contextmenu', function(e) {
        // Проверяем, что клик был внутри сетки карточек
        var grid = e.target.closest('.my-card-grid');
        if (!grid) return;

        var cardElement = e.target.closest('[data-card-id]');
        if (cardElement) {
            e.preventDefault();
            e.stopPropagation();
            
            var cardId = cardElement.getAttribute('data-card-id');
            window.currentContextCardId = cardId;
            
            var menu = document.getElementById('custom-context-menu');
            if (!menu) {
                console.warn('Меню не найдено на странице!');
                return;
            }

            // ФИКС 1: Принудительно переносим меню в конец body, 
            // чтобы на него не влияли CSS-стили региона-подвала
            if (menu.parentElement !== document.body) {
                document.body.appendChild(menu);
            }
            
            // ФИКС 2: Показываем меню с максимальным приоритетом (!important)
            menu.style.setProperty('display', 'block', 'important');
            
            var x = e.clientX;
            var y = e.clientY;
            var menuWidth = menu.offsetWidth || 180;
            var menuHeight = menu.offsetHeight || 150;
            
            if (x + menuWidth > window.innerWidth) { x -= menuWidth; }
            if (y + menuHeight > window.innerHeight) { y -= menuHeight; }
            
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';
        }
    }, true); // true = фаза перехвата
    
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('custom-context-menu');
        if (menu && menu.style.display === 'block' && !menu.contains(e.target)) {
            menu.style.setProperty('display', 'none', 'important');
        }
    }, true);

    // Глобальная функция для действий
    window.handleContextAction = function(actionName) {
        var cardId = window.currentContextCardId;
        alert('Выбрано действие: ' + actionName + '\nДля карты с ID: ' + cardId);
        var menu = document.getElementById('custom-context-menu');
        if (menu) menu.style.setProperty('display', 'none', 'important');
    };

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
})();
