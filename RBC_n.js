// aaa
(function() {
    if (window.rcbMenuInitialized) return;
    window.rcbMenuInitialized = true;

    // 1. КОНТЕКСТНОЕ МЕНЮ (ПКМ)
    document.addEventListener('contextmenu', function(e) {
        var grid = e.target.closest('.my-card-grid');
        if (!grid) return;

        var cardElement = e.target.closest('[data-card-id]');
        if (cardElement) {
            e.preventDefault();
            e.stopPropagation();
            
            // Получаем данные из атрибутов
            var listedCount = parseInt(cardElement.getAttribute('data-listed-count') || '0');
            var unlistedCount = parseInt(cardElement.getAttribute('data-unlisted-count') || '0');
            
            window.currentInstanceId = cardElement.getAttribute('data-unlisted-instance-id');
            window.currentOpenDealId = cardElement.getAttribute('data-open-deal-id');
            
            var menu = document.getElementById('custom-context-menu');
            var sellBtn = document.getElementById('sell-card-btn');
            var removeBtn = document.getElementById('remove-sell-btn');
            if (!menu) return;

            // Умное отображение кнопок
            if (unlistedCount > 0) {
                sellBtn.style.display = 'block';
            } else {
                sellBtn.style.display = 'none';
            }

            if (listedCount > 0) {
                removeBtn.style.display = 'block';
            } else {
                removeBtn.style.display = 'none';
            }

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

    // 2. ОТКРЫТИЕ ОКНА ПРОДАЖИ (12)
    document.addEventListener('click', function(e) {
        var sellBtn = e.target.closest('#sell-card-btn');
        if (sellBtn) {
            e.preventDefault();
            e.stopPropagation();
            var instanceId = window.currentInstanceId;
            var menu = document.getElementById('custom-context-menu');
            if (menu) menu.style.setProperty('display', 'none', 'important');
            
            jsAPI.modal.open({ page: { src: '12', query: { P12_INSTANCE_ID: instanceId } }, title: 'Выставить на продажу' });
        }
    }, true);

    // 3. ОТКРЫТИЕ ОКНА СНЯТИЯ С ПРОДАЖИ (13)
    document.addEventListener('click', function(e) {
        var removeBtn = e.target.closest('#remove-sell-btn');
        if (removeBtn) {
            e.preventDefault();
            e.stopPropagation();
            var dealId = window.currentOpenDealId;
            var menu = document.getElementById('custom-context-menu');
            if (menu) menu.style.setProperty('display', 'none', 'important');
            
            jsAPI.modal.open({ page: { src: '13', query: { P13_DEAL_ID: dealId } }, title: 'Снять с продажи' });
        }
    }, true);

    // 4. ЖИВАЯ ФИЛЬТРАЦИЯ
    window.lastKnownFilterValue = null;
    function checkFilterChange() {
        if (window.jsAPI) {
            var currentVal = jsAPI.getItem('P_FILTER');
            if (currentVal !== window.lastKnownFilterValue && currentVal !== undefined) {
                window.lastKnownFilterValue = currentVal;
                jsAPI.component('REGION_GEN_VUN5I').refresh();
            }
        }
    }
    document.addEventListener('click', function(e) { setTimeout(checkFilterChange, 150); }, true);
})();
