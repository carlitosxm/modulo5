const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const puerto=3001;

let laptop=[
    {id:1,marca:"hp",procesador:"i7",memoria:"16 GB",disco:"1 TB"},
    {id:2,marca:"asus",procesador:"i7",memoria:"16 GB",disco:"1 TB"},
    {id:3,marca:"asus",procesador:"i5",memoria:"16 GB",disco:"1 TB"},
    {id:4,marca:"asus",procesador:"i3",memoria:"16 GB",disco:"1 TB"}
]

app.use(bodyParser.json());

app.use("/laptop",(request,response,next)=>{
    console.log("ingresa a middleware");
    console.log("header: ",request.headers);
    console.log("body: ",request.body);
    next();
});//se ejecuta apra cualquier accion http

app.get("/laptop",(request,response)=>{//listar
    
    //response.send("get contactos");//repuesta codifo 200
    console.log("ingresa a get");
    response.send(laptop);
});

app.post("/laptop",(req,resp)=>{//crear
    req.body.id=99;
    resp.send(req.body);
});

app.get("/laptop/:id",(request,response)=>{//buscar
    let id=parseInt(request.params.id);
    let resultado=laptop.find(laptop => laptop.id === id)
    console.log("ingresa a get");
    response.send(resultado);
});


app.put("/laptop/:id",(req,resp)=>{//actualizar por id
    const id=parseInt(req.params.id);
    let index=laptop.findIndex(laptop => laptop.id === id)
    laptop[index] = { ...laptop[index], ...req.body };
    console.log("id",id, laptop);
    resp.send(req.body);
});

app.delete("/laptop/:id",(req,resp)=>{
    const id=parseInt(req.params.id);
    let index=laptop.findIndex(laptop => laptop.id === id)
    let eliminado = laptop.splice(index, 1);
    console.log("id",id ,laptop);
    resp.send({id:id});
});

app.listen(3001,()=>{
    console.log("Servidor listo en el puerto "+3001);
});