
const Book = require('../models/book');

module.exports = {
    addBook: async (args, req)=>{
        if (!req.isAuth) {
            throw new Error('Unauthorized!');
          }

          try{
            const isExist = await Book.findOne({title: args.inputBook.title});
            if(isExist && isExist.ownedBy == req.userId){
              throw new Error('This book is already exist!');
            }
            const book = new Book({
                title: args.inputBook.title,
                description: args.inputBook.description,
                ownedBy: req.userId
            });

            const result = await book.save();

            return result;
          }catch(err){
              throw err;
          }

    },
    
   book : async(args, req)=>{
      if(!req.isAuth){
        throw new Error('Not Authorized');
      }

      try{
        const book = await Book.find({ownedBy: req.userId});

        return book;
      }catch(err){
        throw err;
      }
   },

   deleteBook: async(args, req)=>{
     if (!req.isAuth){
      throw new Error('Not Authorized');
     }
     try{

      const book = await Book.findOne({_id: args.id});

      if(!book){
        throw new Error('Book doesnt exist');
      }

      if(book.ownedBy != req.userId){
        throw new Error('Not Authorized to do this operation!');
      }

      const bookReturned = book;

      await book.delete();

      return{...bookReturned._doc};

     }catch(err){
      throw err;
     }
   },

   updateBook: async(args, req)=>{
     if (!req.isAuth){
       throw new Error('Not Authorized');
     }

     try{

      const book = await Book.findById(args.inputUpdateBook.id);

      if(!book){
        throw new Error('Book doesnt exist!');
      }

      if(book.ownedBy != req.userId){
        throw new Error('You are not authorized to do this!');
      }

      if(args.inputUpdateBook.title){
        book.title = args.inputUpdateBook.title;
      }

      if(args.inputUpdateBook.description){
        book.description = args.inputUpdateBook.description;
      }

      await book.save();

      return(book);

     }catch(err){
       throw err;
     }
   }
  };