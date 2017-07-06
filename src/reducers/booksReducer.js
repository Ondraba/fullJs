"user strict"

export function booksReducer(state={
  books:[]
},action){
  switch(action.type){
    // case "INCREMENT":
    // return state + action.payload;
    // break;
    case "GET_BOOKS":
    return {...state, books:[...action.payload]}
    break;

    case "POST_BOOK":
    return {...state, books:[...state.books,...action.payload],msg:'Saved! Click to continue',
    style:'success', validation:'success' }
      //znamena ze vrati stav appky kdy se do state.books concatna payload - nova kniha}
    //let books = state.books.concat(action.payload);
    //return {books};
    //or return {books:[..state.books, ...action.payload]}
    break;

    case "POST_BOOK_REJECTED":
    return {...state, msg:'Please, try again', style:'danger', validation:'error' }
    break;

    case "RESET_BUTTON":
    return {...state, msg:null, style:'primary', validation:null}
    break;


    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book._id.toString() == action.payload;
      }
    )
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete +1)]};
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate= [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    )

    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    console.log("what is newbookupdate", newBookToUpdate);
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate),
      newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate +1)]};
    break;
  }
  return state
}
