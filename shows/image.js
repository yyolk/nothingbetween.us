function(doc, req) {  
  
  return { code : 200, headers : { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type:" : "image/png",
    },
    base64: doc.img
     };

}