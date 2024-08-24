const Likes = require('../model/likes');

const likeunlike = async (req, res, next) => {
    const { blogId, userId } = req.body;

    try {
        // Check if the like already exists
        const existingLike = await Likes.findOne({ userId: userId, blogId: blogId });

        if (existingLike) {
            await Likes.deleteOne({id: existingLike.id});
            return res.status(200).json({
                success: true,
                message: 'Blog unliked successfully',
            });
        } else {
            const newLike = new Likes({ userId: userId, blogId: blogId });
            await newLike.save();

            return res.status(200).json({
                success: true,
                message: 'Blog liked successfully',
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to toggle like status',
        });
    }
}

const userlikes = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const items = await Likes.find({userId: userId});
        if (!items) {
            return res.status(200).json({
                success: false,
                message: 'No data found',
                data: items
            })
        }

        return res.status(200).json({
            success: true,
            message: 'like list items',
            data: items
        })

    } catch (error) {
        return res.status(500).json({
            message: `failed to fetch list due to ${error.message}`
        })
    }
}


const likelist = async (req, res, next) => {
    try {

        const items = await Likes.find();
        if (!items) {
            return res.status(200).json({
                success: false,
                message: 'No data found',
                data: items
            })
        }

        return res.status(200).json({
            success: true,
            message: 'like list items',
            data: items
        })

    } catch (error) {
        return res.status(500).json({
            message: `failed to fetch list due to ${error.message}`
        })
    }
}

module.exports = { likeunlike, likelist , userlikes};
