const users = require('../model/users');

const users_list = async (req, res, next) => {
    try {
        const list = await users.find();
        if (list.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'no users found',
                data: list,
            })
        }
        return res.status(200).json({
            success: true,
            message: 'users list',
            data: list,
        })

    } catch (error) {
        return res.status(500).json({ messga: 'failed to get users' });
    }
}

const user_detail = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await users.findOne({ id: id });
        if (!user) {
            return res.status(404).json({
                message: 'No users found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'user details',
            data: user,
        })

    } catch (error) {
        return res.status(500).json({
            message: "failed to get user details `${error.message}`"
        })
    }
}

const delete_user = async (req, res, next) => {
    const { id } = req.params;
    try {

        const user = await users.findOneAndDelete({ id: id });
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        res.status(200).json({
            message: 'user deleted successfully',
            data: user,
        })

    } catch (error) {
        return res.status(500).json({
            message: 'failed to delete'
        })
    }
}

const verifyAccount = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await users.findOne({id:id});
        if (!user) {
            return res.status(404).json({
                message: 'user does not exist'
            })
        }
        user.verified = true;
        await user.save();
        return res.status(200).json({
            message: 'User account verified successfully',
            data: user
        });

    } catch (error) {
        return res.status(404).json({
            message: 'failed to update account'
        })
    }
}

const update_user_detail = async (req, res, next) => { }


module.exports = { users_list, user_detail, update_user_detail, delete_user, verifyAccount };