const db = require("../models/index.js");
const Instance = db.instances;
const Book = db.books;
const User = db.users;
const jwt = require("jsonwebtoken");

exports.changeInstance = async (req, res) => {
    try {
        if (!req.body || !req.body.action || !req.body.bookedBy)
            return res.status(400).json({ success: false, msg: "Action and bookedBy are mandatory." });

        if (req.body.action == "book") {
            const user = await User.findOne({username: req.body.bookedBy}).exec();

            // verificar se o nome do user existe
            if (user) {
                if (req.params.instanceId.match(/^[a-f\d]{24}$/i)) {
                    // Verificar se a instância está disponível
                    const instancia = await Instance.findOne({_id: req.params.instanceId}).exec();

                    if (!instancia) {
                        return res.status(404).json({ success: false, msg: "A instância do livro não foi encontrada" });
                    }

                    if (instancia.status == "Available") {
                        const currentDate = new Date();
                        const after5days = currentDate.setDate(currentDate.getDate() + 5);

                        await Instance.updateOne({_id: instancia._id }, {$set: { status: 'Booked', bookedBy: user._id, returnDate: after5days }})
                        await User.updateOne({_id: user._id}, {$push: {rentals: instancia._id}});
                        return res.status(201).json({ success: true, msg: "Book was booked successfully", location: "/libraryapi/v1/instances/" + instancia._id });
                    } else {
                        return res.status(401).json({ success: false, msg: "A instância do livro não está disponível" });
                    }
                } else {
                    return res.status(400).json({ success: false, msg: "ID de instância inválido" });
                }
            } else {
                return res.status(404).json({ success: false, msg: "Utilizador não encontrado" });
            }
        } else if (req.body.action == "deliver") {
            const user = await User.findOne({username: req.body.bookedBy}).populate("rentals").exec();

            // verificar se o nome do user existe
            if (user) {
                if (req.params.instanceId.match(/^[a-f\d]{24}$/i)) {
                    // Verificar se a instância esta booked
                    const instancia = await Instance.findOne({_id: req.params.instanceId}).exec();

                    if (!instancia) {
                        return res.status(404).json({ success: false, msg: "A instância do livro não foi encontrada" });
                    }

                    if (instancia.status == "Booked") {
                        await Instance.updateOne({_id: instancia._id }, {$set: { status: 'Available', bookedBy: null, returnDate: null }})
                        // await User.updateOne({_id: user._id }, {$pull:{ }})
                        return res.status(201).json({ success: true, msg: "Book was made available successfully", location: "/libraryapi/v1/instances/" + instancia._id });
                    } else {
                        return res.status(401).json({ success: false, msg: "A instância do livro não está disponível" });
                    }
                } else {
                    return res.status(400).json({ success: false, msg: "ID de instância inválido" });
                }
            } else {
                return res.status(404).json({ success: false, msg: "Utilizador não encontrado" });
            }
        } else {
            return res.status(404).json({ success: false, msg: "Action not recognized" });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, msg: err.message || "Some error occurred while creating a new user." });
    };
};