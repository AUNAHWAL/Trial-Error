(function() {
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    document.addEventListener('contextmenu', function(e) {
        var grid = e.target.closest('.my-card-grid');
        if (!grid) return;

        var cardElement = e.target.closest('[data-card-id]');
        if (cardElement) {
            e.preventDefault();
            e.stopPropagation();
            
            var cardId = cardElement.getAttribute('data-card-id');
            window.currentContextCardId = cardId;
            
            var menu = document.getElementById('custom-context-menu');
            if (!menu) return;

            // Принудительно переносим в body (защита от обрезки родителем)
            if (menu.parentElement !== document.body) {
                document.body.appendChild(menu);
            }
            
            // Показываем меню
            menu.style.setProperty('display', 'block', 'important');
            
            // ФИКС: Абсолютный z-index и принудительное позиционирование
            menu.style.setProperty('z-index', '999999', 'important'); 
            
            var x = e.clientX;
            var y = e.clientY;
            var menuWidth = menu.offsetWidth || 180;
            var menuHeight = menu.offsetHeight || 150;
            
            // Умное позиционирование (чтобы меню не улетало за края экрана)
            if (x + menuWidth > window.innerWidth) { x -= menuWidth; }
            if (y + menuHeight > window.innerHeight) { y -= menuHeight; }
            
            menu.style.setProperty('left', x + 'px', 'important');
            menu.style.setProperty('top', y + 'px', 'important');
        }
    }, true); 
    
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('custom-context-menu');
        if (menu && menu.style.display === 'block' && !menu.contains(e.target)) {
            menu.style.setProperty('display', 'none', 'important');
        }
    }, true);

    window.handleContextAction = function(actionName) {
        var cardId = window.currentContextCardId;
        alert('Выбрано действие: ' + actionName + '\nДля карты с ID: ' + cardId);
        var menu = document.getElementById('custom-context-menu');
        if (menu) menu.style.setProperty('display', 'none', 'important');
    };
})();
