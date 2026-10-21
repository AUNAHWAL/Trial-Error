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
            
            // Запоминаем ID карты и ID конкретного экземпляра
            window.currentContextCardId = cardElement.getAttribute('data-card-id');
            window.currentInstanceId = cardElement.getAttribute('data-instance-id');
            
            var menu = document.getElementById('custom-context-menu');
            if (!menu) return;

            if (menu.parentElement !== document.body) {
                document.body.appendChild(menu);
            }
            
            menu.style.setProperty('display', 'block', 'important');
            menu.style.setProperty('z-index', '999999', 'important'); 
            
            var x = e.clientX;
            var y = e.clientY;
            var menuWidth = menu.offsetWidth || 180;
            var menuHeight = menu.offsetHeight || 150;
            
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

    // ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ПРОДАЖИ
    window.openSellModal = function() {
        var instanceId = window.currentInstanceId;
        
        // Скрываем контекстное меню
        var menu = document.getElementById('custom-context-menu');
        if (menu) menu.style.setProperty('display', 'none', 'important');
        
        // Открываем модальное окно "12" и передаем туда ID экземпляра
        jsAPI.modal.open({ 
            page: { 
                src: '12', 
                query: { P12_INSTANCE_ID: instanceId } 
            }, 
            title: 'Выставить на продажу' 
        });
    };
})();
