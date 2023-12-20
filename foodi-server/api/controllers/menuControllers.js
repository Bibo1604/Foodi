const Menu = require("../models/Menu")

// get all menu items
const getAllMenuItems = async (req, res) => {
    try {
        const menu = await Menu.find({}).sort({ createdAt: -1 });
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// post a new menu item
const postMenuItem = async (req, res) => {
    const newItem = req.body;
    try {
        const result = await Menu.create(newItem);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete a menu item
const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found!" });
        }
        res.status(200).json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get single menu item
const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId);
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update single menu item
const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { _id, name, recipe, image, category, price, createdAt } = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, { _id, name, recipe, image, category, price, createdAt }, {
            new: true,
            runValidators: true,
        });

        if (!updatedMenu) {
            return res.status(404).json({message: "Item not found"});
        }

        res.status(200).json(updatedMenu);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem
}