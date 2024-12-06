// 引入所需模块
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 创建 Express 应用
const app = express();
const PORT = 5000; // 设置服务器端口

// 中间件
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析请求体中的 JSON 数据

// 菜单数据（示例）
const menu = [
    { id: 1, name: 'Fried Rice', price: 10, image: 'fried_rice.jpg' },
    { id: 2, name: 'Burger', price: 8, image: 'burger.jpg' },
    { id: 3, name: 'Pasta', price: 12, image: 'pasta.jpg' },
];

// 路由：获取菜单
app.get('/menu', (req, res) => {
    res.json(menu); // 返回菜单数据
});

// 路由：提交订单
app.post('/order', (req, res) => {
    const order = req.body; // 获取订单数据
    console.log('Order received:', order); // 打印订单数据
    res.status(201).send({ message: 'Order placed successfully!' }); // 返回确认消息
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
