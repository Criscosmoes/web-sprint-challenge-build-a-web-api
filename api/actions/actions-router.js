//actions router/database

const router = require('express').Router(); 
const db = require('./actions-model'); 
const projectDb = require('../projects/projects-model'); 




router.get('/actions', async (req, res) => {
    
    try {
        const actions = await db.get(); 

        return res.status(200).send(actions); 
    }
    catch(e){
        res.status(500).send(e); 
    }

})


router.get('/actions/:id', async (req, res) => {
    try {
        const action = await db.get(req.params.id); 

        if(!action) return res.status(404).send({error: "Please provide a valid ID"})

        return res.status(200).send(action); 
    }
    catch(e){
        res.status(500).send(e); 
    }
})

router.get('/projects/:id/actions', async (req, res) => {

    try {
        const actions = await projectDb.getProjectActions(req.params.id); 

        if(!actions) return res.status(400).send([]); 

        return res.status(200).send(actions); 
    }
    catch(e){
        res.status(500).send(); 
    }


})

router.post('/actions', async (req, res) => {

    try {
        const { description, notes, project_id } = req.body; 

        if(!description || !notes || !project_id) return res.status(400).send({e: 'Please provide a description and notes'}); 

        const actionNew = { description, notes, project_id, completed: false }; 

        await db.insert(actionNew); 
        return res.status(201).send(actionNew); 
    }
    catch(e){
        res.status(500).send(e); 
    }
})

router.put('/actions/:id', async (req, res) => {


    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({e: "Please provide updates"})
        }

        const { description, notes, } = req.body; 

        if(!description || !notes) return res.status(400).send({e: 'Please provide a description and notes'});

        const action = await db.get(req.params.id);

        if(!action) return res.status(400).send({e: "action does not exist"})

        const changes = { description, notes, completed: true, project_id: req.params.id }; 

        await db.update(req.params.id, changes); 

        return res.status(200).send(changes); 
        
    }
    catch(e){
        res.status(500).send(); 
    }
})


router.delete('/actions/:id', async (req, res) => {

    try {

        const action = await db.get(req.params.id); 
        if(!action) return res.status(400).send({e: "Please provide a valid ID"})

        await db.remove(req.params.id); 
        res.status(400).send({message: "Deleted Successfully"});
    }
    catch(e){
        res.status(500).send(); 
    }
})




module.exports = router; 
