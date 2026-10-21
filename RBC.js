(function() {
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    // 1. Показ контекстного меню при ПКМ
    document.addEventListener('contextmenu', function(e) {
        var grid = e.target.closest('.my-card-grid');
        if (!grid) return;

        var cardElement = e.target.closest('[data-card-id]');
        if (cardElement) {
            e.preventDefault();
            e.stopPropagation();
            
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
    
    // 2. Скрытие меню
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('custom-context-menu');
        if (menu && menu.style.display === 'block' && !menu.contains(e.target)) {
            menu.style.setProperty('display', 'none', 'important');
        }
    }, true);

    // 3. Открытие модального окна продажи
    document.addEventListener('click', function(e) {
        var sellBtn = e.target.closest('#sell-card-btn');
        if (sellBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            var instanceId = window.currentInstanceId;
            var menu = document.getElementById('custom-context-menu');
            if (menu) menu.style.setProperty('display', 'none', 'important');
            
            jsAPI.modal.open({ 
                page: { src: '12', query: { P12_INSTANCE_ID: instanceId } }, 
                title: 'Выставить на продажу' 
            });
        }
    }, true);

    // 4. ЖИВАЯ ФИЛЬТРАЦИЯ (Обновление отчета без перезагрузки)
    document.addEventListener('change', function(e) {
        // Проверяем, что изменился именно наш фильтр (P_FILTER)
        if (e.target && (e.target.name === 'P_FILTER' || e.target.id === 'P_FILTER')) {
            
            // 1. Сохраняем новое значение в сессию XRAD
            if (window.jsAPI) {
                jsAPI.setItem('P_FILTER', e.target.value);
                
                // 2. Обновляем регион с карточками (Static ID: REGION_GEN_VUN5I)
                jsAPI.component.refresh('REGION_GEN_VUN5I');
            }
        }
    });

})();
