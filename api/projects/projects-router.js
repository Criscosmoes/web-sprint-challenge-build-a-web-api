const router = require('express').Router(); 
const db = require('./projects-model'); 

router.get('/projects', async (req, res) => {
    
    try {
        const projects = await db.get(); 

        if(!projects) return res.status(400).send([]); 
        
        return res.status(200).send(projects); 
    }
    catch(e){
        res.status(500).send(); 
    }

})

router.get('/projects/:id', async (req, res) => {
    try {
        const project = await db.get(req.params.id); 

        if(!project) return res.status(404).send();

        return res.status(200).send(project); 
    }
    catch(e){
        res.status(500).send(e); 
    }
})

router.post('/projects', async (req, res) => {

    try {
        const { description, name } = req.body; 

        if(!description || !name) return res.status(400).send(); 

        const newProject = { description, name, completed: false}; 

        const addProject = await db.insert(newProject); 
        res.send(addProject); 
    }
    catch(e){
        res.status(500).send(); 
    }
})

router.put('/projects/:id', async (req, res) => {

    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400); 
        }
    
        const { name, description } = req.body; 
    
        if(!name || !description) return res.status(400).send(); 
    
        const changes = { name, description }; 
    
        await db.update(req.params.id, changes); 
    
        return res.status(201).send(changes); 
        
    }
    catch(e){
        res.status(500).send(e); 
    }


})

router.delete('/projects/:id', async (req, res) => {
    try {
        const project = db.get(req.params.id); 

        if(!project) return res.status(404); 
        await db.remove(req.params.id); 
        return res.status(200).send(project); 
    }
    catch(e) {
        res.status(500).send(); 
    }
})
module.exports = router; 
