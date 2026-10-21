(function() {
    // Защита от двойной инициализации
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    // ==========================================
    // 1. КОНТЕКСТНОЕ МЕНЮ (ПКМ)
    // ==========================================
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
    
    // Скрытие меню при клике мимо
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('custom-context-menu');
        if (menu && menu.style.display === 'block' && !menu.contains(e.target)) {
            menu.style.setProperty('display', 'none', 'important');
        }
    }, true);

    // ==========================================
    // 2. ОТКРЫТИЕ ОКНА ПРОДАЖИ
    // ==========================================
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

    // ==========================================
    // 3. ЖИВАЯ ФИЛЬТРАЦИЯ (Умный перехват)
    // ==========================================
    // Запоминаем изначальное значение фильтра при загрузке
    window.lastKnownFilterValue = null;

        function checkFilterChange() {
        if (window.jsAPI) {
            var currentVal = jsAPI.getItem('P_FILTER');
            
            if (currentVal !== window.lastKnownFilterValue && currentVal !== undefined) {
                window.lastKnownFilterValue = currentVal;
                console.log('Фильтр изменен на:', currentVal);
                
                // ✅ ПРАВИЛЬНЫЙ СИНТАКСИС: сначала получаем компонент по ID, затем вызываем refresh()
                jsAPI.component('REGION_GEN_VUN5I').refresh();
            }
        }
    }
    // XRAD не вызывает стандартные события для своих списков. 
    // Поэтому мы "слушаем" любые клики на странице. Как только пользователь 
    // кликает по выпадающему списку и выбирает значение, мы ждем 150 мс 
    // и проверяем, изменилось ли значение в системе.
    document.addEventListener('click', function(e) {
        setTimeout(checkFilterChange, 150);
    }, true);

})();
