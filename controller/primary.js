const primary = require('../model/primary');

const creatPrimary = async (req, res, next) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "please enter your category name."});
    }
    try {
        const items = new primary({name: name});
        await items.save();
        res.status(200).json({
            sucess: true,
            message: "category successfully created",
            data: items,
        })
    } catch (error) {
        res.status(500).json({message: "failed to add primary category"});
    }
}


const primarylistItems = async (req, res, next) => {
    try {

        const listItems = await primary.find();
        if (!listItems) {
            return res.status(200).json({
                success: true,
                message: 'no data found',
                data: listItems,
            })
        }
        return res.status(200).json({
            success: true,
            message: 'no data found',
            data: listItems,
        })

    } catch (error) {
        return res.status(500).json({message: 'failed to fetch user details'})
    }
}


const deletePrimary = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        // Find the item by your custom id field
        const existing = await primary.findOne({ id: id });

        if (!existing) {
            return res.status(404).json({ message: "No data found" });
        }

        // Delete the item by your custom id field
        const items = await primary.deleteOne({ id: id });

        res.status(200).json({
            message: 'Item deleted successfully',
            data: items,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete primary category", error });
    }
}


const editPrimary = async (req, res, next) => {
    const {name} = req.body;
    if (!name){
        res.status(404).json({message: 'not found'});
    }

    const items = await primary.findOneAndUpdate({name: name}, {new: true});
}


module.exports = {creatPrimary, primarylistItems, editPrimary, deletePrimary};