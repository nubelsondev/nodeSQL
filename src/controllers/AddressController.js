const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        // Verifica se o user existe
        const user = await User.findByPk(user_id, {
            // se existe, retore os seus dados incluindo os addresses associados
            include: { association: "addresses" }
        });

        return res.json(user);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        // Verificar se o user existe
        const user = await User.findByPk(user_id);

        // Se este usuário não existir, retorne um erro
        !user && res.status(400).json({ error: "User not found!" });

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        });

        return res.json(address);
    }
};
