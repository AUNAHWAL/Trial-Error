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
})();
