const categories = require('../model/categories');


const createCategory = async (req, res, next) => {
    const {name} = req.body;
    try {
        const category = new categories({ name: name })
        if (!category) {
            return res.status(200).json({
                success: true,
                message: 'failed to create category',
                data: categories,
            })
        }
        await category.save();
        return res.status(200).json({
            success: true,
            message: 'created successfully',
            data: category,
        })

    } catch (error){
        return res.status(500).json({
            message: 'failed to create category'
        })
    }
}

const categorylist = async (req, res, next) => {
    try {
        const list = await categories.find();
        if (list.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'no data found',
                data: list
            })
        }

        return res.status(200).json({
            success: true,
            message: 'successfully fetched list',
            data: list
        })

    } catch (error) {
        return res.status(500).json({
            message: 'failed to fetch list'
        })
    }
}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await categories.findOne({ id: id });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        const item = await categories.deleteOne({ id: id });

        return res.status(200).json({
            success: true,
            message: 'Deleted successfully',
            data: item,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: error.message,
        });
    }
};




module.exports = {createCategory, categorylist, deleteCategory};