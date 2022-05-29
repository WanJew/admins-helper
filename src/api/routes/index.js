const { Router } = require('express');

const GuildModel = require('../../models/guild');

const router = Router();

const APIerror = (error, status) => ({
    error,
    statusCode: status,
});

router.get('/api/guilds/:id', async(req, res) => {
    const { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json(APIerror("Неверно указан параметр ID!", "400"))
    }

    const guild = await GuildModel.findOne({
        id
    })

    if(!guild) {
        return res.status(400).json(APIerror(`Сервер с ID "${id}" не был найден!`, '400' ))
    }

    return res.status(200).json(guild)
})

module.exports = router;