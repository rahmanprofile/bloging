const comments = require('../model/comment');

const makecamments = async (req, res, next) => {
    const {userId, blogId, comment} = req.body;
    try {

        const cmt = new comments({
            userId: userId,
            blogId: blogId,
            comment: comment,
        });

        if (!cmt) {
            return res.status(400).json({
                message: 'failed to create'
            })
        }

        await cmt.save();
        return res.status(200).json({
            success: true,
            message: 'data added successfully',
            data: cmt
        })

    } catch (error) {
        return res.status(500).json({
            message: 'failed to get user detail'
        })
    }
}

const userCommentList = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const commentList = await comments.find({ userId: userId });

        if (!commentList || commentList.length === 0) {
            return res.status(404).json({
                success: true,
                message: 'No comments found for this user',
                data: commentList,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Comments fetched successfully',
            comments: commentList
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to get the list'
        });
    }
};

const deleteComments = async (req, res, next) => {
    const { id } = req.params;
    try {
        const items = await comments.findOne({id: id});
        if (!items) {
            return res.status(404).json({message: 'no data found'})
        }
        await comments.deleteOne({id: id});
        return res.status(200).json({
            message: "comment delete successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: 'failed to delete'
        })
    }
}


module.exports = {makecamments, userCommentList, deleteComments};