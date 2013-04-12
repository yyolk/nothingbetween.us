function(doc, req) {  
  return { code : 200, headers : { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type:" : "text/html",
    "Charset" : "UTF-8"   },
    body: '<html><head><link rel="stylesheet" href="/style/main.css" type="text/css"></link></head><body style="'+doc.style+'"><div style="position:absolute;left:50%;top:50%;"><div style="position:relative;top:-50%;left:-50%;">'+doc.message+'</div></div></body></html>'
     };
}