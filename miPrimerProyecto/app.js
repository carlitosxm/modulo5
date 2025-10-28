const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const puerto=3001;
//contacto: id, nombre, apellido, celular

app.use(bodyParser.json());

app.use("/contactos",(request,response,next)=>{
    console.log("ingresa a middleware");
    console.log("header: ",request.headers);
    console.log("body: ",request.body);
    next();
});//se ejecuta apra cualquier accion http

app.get("/contactos",(request,response)=>{
    const contactos=[
        {id:1,nombre:"Carlos",apellido:"Tipan",celular:"0999999999"},
        {id:2,nombre:"Charly",apellido:"Tip",celular:"0799999988"},
        {id:3,nombre:"carlos",apellido:"tipan",celular:"0996599999"}
    ]
    //response.send("get contactos");//repuesta codifo 200
    console.log("ingresa a get");
    response.send(contactos);
});

app.post("/contactos",(req,resp)=>{
    req.body.id=99;
    resp.send(req.body);
});

app.put("/contactos/:idParam",(req,resp)=>{
    const id=req.params.idParam;
    console.log("id",id);
    resp.send(req.body);
});

app.delete("/contactos/:id",(req,resp)=>{
    const id=req.params.id;
    console.log("id",id);
    resp.send();
});

app.listen(3001,()=>{
    console.log("Servidor listo en el puerto "+3001);
});