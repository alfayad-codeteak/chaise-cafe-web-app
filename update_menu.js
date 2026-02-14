const fs = require('fs');
const path = require('path');

const menuPath = path.join(process.cwd(), 'src/data/menu.json');
const rawData = fs.readFileSync(menuPath, 'utf-8');
const menu = JSON.parse(rawData);

const burgerImage = "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg";

const updatedMenu = menu.map(item => {
    if (item.category === 'Burgers' && (!item.image || item.image === "")) {
        return { ...item, image: burgerImage };
    }
    return item;
});

fs.writeFileSync(menuPath, JSON.stringify(updatedMenu, null, 2));
console.log('Menu updated successfully.');
