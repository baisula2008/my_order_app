// 后端 API 地址
const API_URL = 'http://localhost:5000';

// 页面元素
const menuContainer = document.getElementById('menu');
const orderContainer = document.getElementById('order');
const placeOrderButton = document.getElementById('place-order');
const responseMessage = document.getElementById('response-message');

// 用户选择的订单
let order = [];

// 获取菜单数据
async function fetchMenu() {
    try {
        const response = await fetch(`${API_URL}/menu`);
        const menu = await response.json();
        renderMenu(menu);
    } catch (error) {
        console.error('Failed to fetch menu:', error);
    }
}

// 渲染菜单
function renderMenu(menu) {
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToOrder(${item.id}, '${item.name}', ${item.price})">Add to Order</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// 添加到订单
function addToOrder(id, name, price) {
    order.push({ id, name, price });
    renderOrder();
}

// 渲染订单
function renderOrder() {
    orderContainer.innerHTML = '';
    order.forEach((item, index) => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromOrder(${index})">Remove</button>
        `;
        orderContainer.appendChild(orderItem);
    });
}

// 从订单中移除
function removeFromOrder(index) {
    order.splice(index, 1);
    renderOrder();
}

// 提交订单
async function placeOrder() {
    try {
        const response = await fetch(`${API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        const result = await response.json();
        responseMessage.textContent = result.message;
        order = []; // 清空订单
        renderOrder();
    } catch (error) {
        console.error('Failed to place order:', error);
    }
}

// 绑定按钮事件
placeOrderButton.addEventListener('click', placeOrder);

// 加载菜单
fetchMenu();
