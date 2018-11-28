const router = require('express').Router();

router.get('/users/signin', (req,res) => {
    res.send('Inicio de sesión');
});

router.get('/users/signup', (req,res) => {
    res.send('Registro');
});

module.exports = router;