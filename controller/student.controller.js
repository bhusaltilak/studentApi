const Validator = require('fastest-validator');
const models = require('../models');

function save(req,res){
    const student={
    Name: req.body.Name,
    Address: req.body.Address,
    Semester: req.body.Semester,
    gmail: req.body.gmail,
    }

    const schema={
        Name:{type:"string",optional:false,max:"100"},
        Address:{type:"string",optional:false,max:"50"},
        Semester:{type:"number",optional:false},
        gmail:{type:"string",optional:false,max:"50"}
    }
    const v = new Validator();
    const validationResponse = v.validate(student,schema);
    if(validationResponse !==true){
        return res.status(400).json({
            message:"validation fail",
            error:validationResponse
        });
    }
    
    console.log(student);
   // console.log(req.body);
models.Students.create(student).then(result=>{
      res.status(200).json({
        message:"Successfully Created",
        "Result": result
      })
}).catch(error=>{
    res.status(500).json({
        message:"Error Occur",
        Result : error,
    })

})
}


function index(req,res){
    models.Students.findAll().then(result=>{
        res.status(200).json({
            message:"Successfully find",
            result : result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error Occur"
        })
    })
}

function show(req,res){
    const id= req.params.id;
    console.log(id);
    models.Students.findByPk(id).then(result=>{
        if(result==null){
            return res.status(500).json({
                message:"Invalid Id"
            })
        }
        res.status(200).json({
            message:"Successfully Find",
            Result:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error Occur"
        })
    })
};


function update(req,res){
    const id= req.params.id;
    console.log(id);
    const updatePost={
        Name: req.body.Name,
        Address: req.body.Address,
        Semester: req.body.Semester,
        gmail: req.body.gmail,
    }

    const schema={
        Name:{type:"string",optional:false,max:"20"},
        Address:{type:"string",optional:false,max:"50"},
        Semester:{type:"number",optional:false}
    }
  const v = new Validator();
  const validationResponse =v.validate(updatePost,schema);
  if(validationResponse !==true){
    return res.status(400).json({
        message:"Validation failed",
        Error:validationResponse
    })
  } 

    models.Students.findByPk(id).then(result=>{
        if(result==null){
         return res.status(500).json({
                message:"Invalid Id"
            })
        }
    })
    models.Students.update(updatePost,{where:{id:id}}).then(result=>{
        res.status(200).json({
            message:"Successfully updated",
            result:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error Occur"
        })
    })
}


function destroy(req,res){
    const id= req.params.id;
    console.log(id);
    models.Students.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message:"Successfully",
            Result:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error Occur"
        })
    })
}

module.exports = {
    save:save,
    index:index,
    show:show,
    update:update,
    destroy:destroy
}