function(doc) {
  
  if (doc.created_at) {
      emit(doc.created_at, {
          message: doc.message,
          id:doc._id,
          image:doc.image,
          style:doc.style
      });
  }
};