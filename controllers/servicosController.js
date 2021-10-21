const { v4: uuid } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadAvatar = multer({ storage: storage }).single("avatar");

const servicos = [
  { id: uuid(), nome: "Banho", valor: 40, avatar: "/img/cachorro.jpg" },
  { id: uuid(), nome: "Tosa", valor: 50, avatar: "/img/cachorro.jpg" },
  { id: uuid(), nome: "Pedicure", valor: 10, avatar: "/img/cachorro.jpg" },
  { id: uuid(), nome: "Denticure", valor: 130, avatar: "/img/cachorro.jpg" },
  { id: uuid(), nome: "Clinica", valor: 150, avatar: "/img/cachorro.jpg" },
];

const servicosController = {
  index: (req, res) => {
    return res.render("servicos/lista", { servicos });
  },

  store: (req, res) => {
    return res.render("servicos/cadastro");
  },

  save: (req, res) => {
    uploadAvatar(req, res, () => {
      const { nome, valor } = req.body;
      let avatar
      if (req.file != undefined) {
        avatar = "/img/" + req.file.originalname;
      }else{
        avatar = "/img/cachorro.jpg";
      }
      servicos.push({ id: uuid(), nome, valor: Number(valor), avatar: avatar });
      return res.redirect("/servicos");
    });
  },

  edit: (req, res) => {
    const { id } = req.params;
    const servico = servicos.find((servico) => servico.id == id);
    return res.render("servicos/edit", { servico });
  },

  update: (req, res) => {
    uploadAvatar(req, res, () => {
      const { nome, valor } = req.body;
      const { id } = req.params;
      const servicoIndex = servicos.findIndex((servico) => servico.id == id);
      let avatar = '';

      if (req.file != undefined) {
        avatar = "/img/" + req.file.originalname;
      }else{
        avatar = servicos[servicoIndex].avatar;
      }

      const servicoAtualizado = {
        id,
        nome,
        valor: Number(valor),
        avatar: avatar,
      };

      servicos[servicoIndex] = servicoAtualizado;
      return res.redirect("/servicos");
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const servicoIndex = servicos.findIndex((servico) => servico.id == id);

    servicos.splice(servicoIndex, 1);

    return res.redirect("/servicos");
  },
};

module.exports = servicosController;
