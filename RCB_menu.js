document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли на странице наше меню
    if (document.getElementById('custom-context-menu')) {
        
        document.addEventListener('contextmenu', function(e) {
            // ПРОВЕРКА: Клик должен быть строго внутри сетки карточек
            var grid = e.target.closest('.my-card-grid');
            if (!grid) {
                return; // Если клик не в сетке (например, в модалке) - выходим
            }

            var cardElement = e.target.closest('[data-card-id]');
            if (cardElement) {
                e.preventDefault();
                e.stopPropagation();
                
                var cardId = cardElement.getAttribute('data-card-id');
                window.currentContextCardId = cardId;
                
                var menu = document.getElementById('custom-context-menu');
                if (!menu) return;
                
                menu.style.display = 'block';
                
                var x = e.clientX;
                var y = e.clientY;
                var menuWidth = menu.offsetWidth || 180;
                var menuHeight = menu.offsetHeight || 150;
                
                if (x + menuWidth > window.innerWidth) { x -= menuWidth; }
                if (y + menuHeight > window.innerHeight) { y -= menuHeight; }
                
                menu.style.left = x + 'px';
                menu.style.top = y + 'px';
            }
        }, true); 
        
        document.addEventListener('click', function(e) {
            var menu = document.getElementById('custom-context-menu');
            if (menu && !menu.contains(e.target)) {
                menu.style.display = 'none';
            }
        }, true);
    }
});

window.handleContextAction = function(actionName) {
    var cardId = window.currentContextCardId;
    alert('Выбрано действие: ' + actionName + '\nДля карты с ID: ' + cardId);
    var menu = document.getElementById('custom-context-menu');
    if (menu) menu.style.display = 'none';
};
