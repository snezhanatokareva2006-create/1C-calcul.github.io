// Глобальный массив корзины
let cart = [];

// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК 
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        }
    });
    
    if (tabName === 'cart') {
        renderCart();
    }
}

// ==================== ОБНОВЛЕНИЕ БЕЙДЖА ====================
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
    
    const cartEmpty = document.getElementById('cartEmpty');
    const receipt = document.getElementById('receipt');
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (receipt) receipt.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (receipt) receipt.style.display = 'block';
    }
}

// ==================== ДОБАВЛЕНИЕ ====================

// Почасовая
function addHourlyToCart() {
    const select = document.getElementById('hourlyService');
    const rate = parseFloat(select.value);
    const serviceName = select.options[select.selectedIndex].text.split(' — ')[0];
    let hours = parseFloat(document.getElementById('hourlyCount').value);
    const isOnSite = document.getElementById('isOnSite').checked;
    const isEvening = document.getElementById('isEveningWeekend').checked;
        if (isNaN(hours) || hours <= 0) {
        alert('Введите корректное количество часов');
        return;
    }
        hours = Math.ceil(hours * 2) / 2;
        if (isOnSite && hours < 2) {
        hours = 2;
    }
        let finalRate = rate;
    if (isEvening && rate < 3000) {
        finalRate = 3000;
    }
        const total = finalRate * hours;
        cart.push({
        id: Date.now() + Math.random(),
        name: serviceName,
        quantity: 1,
        price: total,
        unitPrice: finalRate,
        hours: hours,
        details: `${hours} ч × ${finalRate.toLocaleString()} ₽/ч`
    });
        updateCartBadge();
    alert('✅ Услуга добавлена в корзину');
}

// Пакет
function addPackageToCart() {
    const select = document.getElementById('packageType');
    const [price, hours] = select.value.split('|').map(Number);
    const name = select.options[select.selectedIndex].text.split(' — ')[0];
    
    cart.push({
        id: Date.now() + Math.random(),
        name: name,
        quantity: 1,
        price: price,
        unitPrice: price,
        hours: hours,
        details: `${hours} часов`
    });
    
    updateCartBadge();
    alert('✅ Пакет добавлен в корзину');
}

// Типовая
function addFixedToCart() {
    const select = document.getElementById('fixedService');
    const price = parseFloat(select.value);
    const name = select.options[select.selectedIndex].text.split(' — ')[0];
    let qty = parseFloat(document.getElementById('fixedQty').value);
    
    if (isNaN(qty) || qty < 1) qty = 1;
    
    cart.push({
        id: Date.now() + Math.random(),
        name: name,
        quantity: qty,
        price: price * qty,
        unitPrice: price,
        details: `${qty} шт × ${price.toLocaleString()} ₽`
    });
    
    updateCartBadge();
    alert('✅ Услуга добавлена в корзину');
}

// ==================== ДАННЫЕ ИТС ====================
const itsData = {
    prof: {
        name: '1С:КП ПРОФ (коммерция)',
        services: {
            '24_months_loyal': { name: '1С:КП ПРОФ на 24 мес (льготное)', price: 102600 },
            '12_months_loyal': { name: '1С:КП ПРОФ на 12 мес (льготное)', price: 57000 },
            '12_months_restore': { name: '1С:КП ПРОФ на 12 мес (восстановление)', price: 68400 },
            '6_months_loyal': { name: '1С:КП ПРОФ на 6 мес (льготное)', price: 30292 },
            '6_months_restore': { name: '1С:КП ПРОФ на 6 мес (восстановление)', price: 36307 },
            '3_months_loyal': { name: '1С:КП ПРОФ на 3 мес (льготное)', price: 16755 },
            '3_months_restore': { name: '1С:КП ПРОФ на 3 мес (восстановление)', price: 20104 }
        }
    },
    budget: {
        name: '1С:КП Бюджет ПРОФ',
        services: {
            '24_months_loyal': { name: '1С:КП Бюджет на 24 мес (льготное)', price: 89986 },
            '12_months_loyal': { name: '1С:КП Бюджет на 12 мес (льготное)', price: 49992 },
            '12_months_restore': { name: '1С:КП Бюджет на 12 мес (восстановление)', price: 59988 },
            '6_months_loyal': { name: '1С:КП Бюджет на 6 мес (льготное)', price: 26543 },
            '6_months_restore': { name: '1С:КП Бюджет на 6 мес (восстановление)', price: 31848 },
            '3_months_loyal': { name: '1С:КП Бюджет на 3 мес (льготное)', price: 14697 },
            '3_months_restore': { name: '1С:КП Бюджет на 3 мес (восстановление)', price: 17635 },
            '1_month_loyal': { name: '1С:КП Бюджет на 1 мес (льготное)', price: 5963 },
            '1_month_restore': { name: '1С:КП Бюджет на 1 мес (восстановление)', price: 7157 },
            '2_month_loyal': { name: '1С:КП Бюджет на 2 мес (льготное)', price: 11929 },
            '2_month_restore': { name: '1С:КП Бюджет на 2 мес (восстановление)', price: 14314 }
        }
    },
    medicine: {
        name: '1С:КП Медицина',
        services: {
            '12_months_loyal': { name: '1С:КП Медицина на 12 мес (льготное)', price: 55267 },
            '12_months_restore': { name: '1С:КП Медицина на 12 мес (восстановление)', price: 66324 },
            '6_months_loyal': { name: '1С:КП Медицина на 6 мес (льготное)', price: 28796 },
            '6_months_restore': { name: '1С:КП Медицина на 6 мес (восстановление)', price: 34533 }
        }
    },
    special: {
        name: 'Льготный договор (8+4)',
        services: {
            'prof_8plus4': { name: '1С:КП ПРОФ 8+4 (льготный)', price: 38000 },
            'budget_8plus4': { name: '1С:КП Бюджет 8+4 (льготный)', price: 38000 },
            'medicine_8plus4': { name: '1С:КП Медицина 8+4 (льготный)', price: 38000 }
        }
    },
    remote: {
        name: 'Удаленные офисы',
        services: {
            '1_5': { name: 'Удаленный офис (1-5 офисов)', price: 7182, perUnit: true },
            '6_10': { name: 'Удаленный офис (6-10 офисов)', price: 6464, perUnit: true },
            '11_20': { name: 'Удаленный офис (11-20 офисов)', price: 5746, perUnit: true },
            '21_50': { name: 'Удаленный офис (21-50 офисов)', price: 5029, perUnit: true }
        }
    },
    industry: {
        name: 'Отраслевой',
        services: {
            'cat1_base_6': { name: 'Отраслевой 1 кат. Базовый 6 мес', price: 8330 },
            'cat1_base_12': { name: 'Отраслевой 1 кат. Базовый 12 мес', price: 15860 },
            'cat1_prof_loyal_12': { name: 'Отраслевой 1 кат. ПРОФ 12 мес', price: 22580 }
        }
    },
    licenses: {
        name: 'Сопровождение лицензий',
        services: {
            '1_20_loyal': { name: 'Сопровождение 1-20 лицензий (льготное)', price: 2232, perUnit: true },
            '1_20_restore': { name: 'Сопровождение 1-20 лицензий (восстановление)', price: 2664, perUnit: true }
        }
    },
    institution: {
        name: 'Сопровождение учреждений',
        services: {
            '12_months_loyal': { name: 'Сопровождение учреждения 12 мес (льготное)', price: 10392 },
            '12_months_restore': { name: 'Сопровождение учреждения 12 мес (восстановление)', price: 12480 }
        }
    }
};

// Функции ИТС
function updateItsServices() {
    const category = document.getElementById('itsCategory').value;
    const serviceContainer = document.getElementById('itsServiceContainer');
    const serviceSelect = document.getElementById('itsService');
    const paramsDiv = document.getElementById('itsParams');
    const addBtn = document.getElementById('itsAddBtn');
    
    if (!category) {
        if (serviceContainer) serviceContainer.style.display = 'none';
        if (paramsDiv) paramsDiv.style.display = 'none';
        if (addBtn) addBtn.style.display = 'none';
        return;
    }
    
    if (serviceSelect) {
        serviceSelect.innerHTML = '';
        const data = itsData[category];
        
        for (let key in data.services) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data.services[key].name + ' — ' + data.services[key].price.toLocaleString() + ' ₽';
            if (data.services[key].perUnit) {
                option.textContent += ' (за 1 шт)';
            }
            serviceSelect.appendChild(option);
        }
    }
    
    if (serviceContainer) serviceContainer.style.display = 'block';
    if (paramsDiv) paramsDiv.style.display = 'none';
    if (addBtn) addBtn.style.display = 'none';
}

function showItsParams() {
    const category = document.getElementById('itsCategory').value;
    const serviceKey = document.getElementById('itsService').value;
    const paramsDiv = document.getElementById('itsParams');
    const addBtn = document.getElementById('itsAddBtn');
    
    if (!serviceKey) {
        if (paramsDiv) paramsDiv.style.display = 'none';
        if (addBtn) addBtn.style.display = 'none';
        return;
    }
    
    const data = itsData[category].services[serviceKey];
    let html = '';
    
    if (data.perUnit) {
        html = `
            <div class="info-block">
                <strong>📌 Цена указана за 1 единицу</strong>
            </div>
            <div class="param-row">
                <label>Количество:</label>
                <input type="number" id="itsQuantity" min="1" value="1">
            </div>
        `;
    } else {
        html = '<div class="info-block">✅ Фиксированная стоимость</div>';
    }
    
    if (paramsDiv) {
        paramsDiv.innerHTML = html;
        paramsDiv.style.display = 'block';
    }
    if (addBtn) addBtn.style.display = 'block';
}

function addItsToCart() {
    const category = document.getElementById('itsCategory').value;
    const serviceKey = document.getElementById('itsService').value;
    
    if (!category || !serviceKey) {
        alert('Выберите услугу');
        return;
    }
    
    const data = itsData[category].services[serviceKey];
    let total = data.price;
    let qty = 1;
    
    const qtyInput = document.getElementById('itsQuantity');
    if (qtyInput) {
        qty = parseFloat(qtyInput.value);
        if (isNaN(qty) || qty < 1) qty = 1;
        total = data.price * qty;
    }
    
    cart.push({
        id: Date.now() + Math.random(),
        name: data.name,
        quantity: qty,
        price: total,
        unitPrice: data.price,
        details: data.perUnit ? `${qty} шт × ${data.price.toLocaleString()} ₽` : 'фикс'
    });
    
    updateCartBadge();
    alert('✅ Услуга добавлена в корзину');
}

// ==================== ОТОБРАЖЕНИЕ КОРЗИНЫ ====================
function renderCart() {
    const container = document.getElementById('receiptItems');
    const totalEl = document.getElementById('receiptTotal');
    
    if (!container) return;
    
    if (cart.length === 0) {
        return;
    }
    
    let html = '';
    let totalSum = 0;
    
    cart.forEach((item, index) => {
        totalSum += item.price;
        const unitPrice = item.unitPrice || (item.price / item.quantity);
        
        html += `
            <div class="receipt-item">
                <div>${index + 1}</div>
                <div class="item-name">
                    ${item.name}
                    <small style="display:block; color:#666; font-size:12px;">${item.details || ''}</small>
                </div>
                <div>${item.quantity}</div>
                <div class="item-price">${unitPrice.toLocaleString()} ₽</div>
                <div class="item-total">${item.price.toLocaleString()} ₽</div>
                <div class="item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    if (totalEl) totalEl.innerHTML = `ИТОГО: ${totalSum.toLocaleString()} ₽`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartBadge();
}

function clearCart() {
    if (confirm('Очистить корзину?')) {
        cart = [];
        renderCart();
        updateCartBadge();
    }
}

// ==================== СОХРАНЕНИЕ В WORD ====================
function generateWord() {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    
    try {
        let htmlContent = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Квитанция Онлайн-Консалтинг</title>
                <style>
                    body { font-family: 'Times New Roman', serif; margin: 2cm auto; max-width: 700px; }
                    h1 { color: #E31B23; text-align: center; font-size: 24px; }
                    h2 { text-align: center; font-size: 18px; }
                    .date { text-align: right; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background: #FFD700; padding: 10px; border: 1px solid #000; text-align: center; }
                    td { padding: 8px; border: 1px solid #999; }
                    td:nth-child(3), td:nth-child(4), td:nth-child(5) { text-align: right; }
                    .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 20px; }
                    .footer { text-align: center; margin-top: 50px; color: #666; }
                </style>
            </head>
            <body>
                <h1>ООО "Онлайн-Консалтинг"</h1>
                <h2>Квитанция на оплату услуг</h2>
                <div class="date">Дата: ${new Date().toLocaleDateString('ru-RU')}</div>
                
                <table>
                    <tr>
                        <th>№</th>
                        <th>Наименование услуги</th>
                        <th>Кол-во</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                    </tr>
        `;
        
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const unitPrice = item.unitPrice || (item.price / item.quantity);
            
            htmlContent += `
                <tr>
                    <td style="text-align: center">${index + 1}</td>
                    <td>
                        ${item.name}
                        <div style="color: #666; font-size: 11px;">${item.details || ''}</div>
                    </td>
                    <td style="text-align: center">${item.quantity}</td>
                    <td style="text-align: right">${Math.round(unitPrice).toLocaleString('ru-RU')} ₽</td>
                    <td style="text-align: right">${Math.round(item.price).toLocaleString('ru-RU')} ₽</td>
                </tr>
            `;
        });
        
        htmlContent += `
                </table>
                
                <div class="total">ИТОГО: ${Math.round(total).toLocaleString('ru-RU')} ₽</div>
                
                <div class="footer">
                    <p>Спасибо за сотрудничество!</p>
                    <p>ООО "Онлайн-Консалтинг", г. Уфа</p>
                </div>
            </body>
            </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        
        link.download = `Квитанция_${day}.${month}.${year}.doc`;
        link.click();
        
        alert('✅ Документ Word успешно сохранен!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при сохранении');
    }
}