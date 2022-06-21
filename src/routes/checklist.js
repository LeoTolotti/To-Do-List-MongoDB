const express = require('express');


const router = express.Router();

const Checklist = require('../models/checklist');


router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklists/index', { checklists: checklists})
    } catch (error) {
        res.status(200).render('pages/error', { error: "Error a exibir as Listas"})
    }
    
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', { error: "Error a carregar o formulario"})
    }
    
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', { error: "Error ao atualizar tarefa!"})
    }
    
})

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name});
    try {
        await checklist.save();
        res.redirect('/checklist');
    } catch (error) {
        res.status(422).render('checklist/new', { checklists: {...checklist, error}});
    }
    })

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', { checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', { error: "Error a exibir as Listas"})
    }
    })

router.put('/:id',async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.updateOne({name});
        res.redirect('/checklist')
    } catch (error) {
        res.status(422).json(error) 
    }
    })

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklist')
    } catch (error) {
    
        res.status(500).render('pages/error', { error: "Error a deletar a Lista de tarefa!"})
    }
    })
    

module.exports = router;
