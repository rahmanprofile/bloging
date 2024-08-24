const blogs = require('../model/blog');
const categories = require('../model/categories');

const createblog = async (req, res, next) => {
    const {userId, categoryId, title, content, imageUrl} = req.body;
    try {
        const blog = new blogs({
            userId: userId,
            title: title,
            content: content,
            imageUrl: imageUrl,
            categoryId: categoryId,
        });

        if (!blog){
            return res.status(400).json({
                message: 'failed to created blog'
            })
        }

        await blog.save();
        return res.status(200).json({
            success: true,
            message: 'blog created successfully',
            blog: blog
        });

    } catch (error) {
        return res.status(500).json({
            message: 'failed to get users details'
        })
    }
}

const bloglist = async (req, res, next) => {
    try {

        const list = await blogs.find();
        if (list.length === 0){
            return res.status(200).json({
                message: 'failed to get blogs'
            })
        }

        var filter = await Promise.all(list.map( async blog => {
            const category = await categories.findOne({id: blog.categoryId});
            return {
                ...blog._doc,
                categoryName: category.name
            };
        }));

        return res.status(200).json({
            success: true,
            message: 'Fetched blogs successfully',
            data: filter
        });


    } catch (error){
        return res.status(500).json({
            message: 'failed to create blog'
        })
    }
}

const usersblog = async (req, res, next) => {
    const {userId} = req.params;
    try {
        const list = await blogs.find({userId: userId});
        if (!list){
            return res.status(200).json({
                message: 'failed to get blogs'
            })
        }

        var filter = await Promise.all(list.map( async blog => {
            const category = await categories.findOne({id: blog.categoryId});
            return {
                ...blog._doc,
                categoryName: category.name
            };
        }));

        return res.status(200).json({
            success: true,
            message: 'Fetched blogs successfully',
            data: filter
        });

    } catch (error){
        return res.status(500).json({
            message: 'failed to create blog'
        })
    }
}

const blogdetail = async (req, res, next) => {
    const {id} = req.params;
    try {
        const list = await blogs.findOne({id: id});
        if (!list){
            return res.status(200).json({
                message: 'failed to get blogs'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'fetched data successfully',
            data: list
        })

    } catch (error){
        return res.status(500).json({
            message: 'failed to create blog'
        })
    }
}

const deleteblog = async (req, res, next) => {
    const {id} = req.params;
    try {
        const list = await blogs.findOne({id: id});
        if (!list){
            return res.status(200).json({
                message: 'failed to delete blogs'
            })
        }

        const data = await blogs.deleteOne({id: id});
        return res.status(200).json({
            success: true,
            message: 'successfully deleted item',
            data: data
        })

    } catch (error){
        return res.status(500).json({
            message: 'failed to create blog'
        })
    }
}

const updateblog = async (req, res, next) => {}


module.exports = {createblog, bloglist, blogdetail, deleteblog, updateblog, usersblog};