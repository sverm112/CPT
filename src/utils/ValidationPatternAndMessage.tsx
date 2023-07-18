export const PatternsAndMessages = {
    numberOnly : {
        pattern:'^[0-9]+',
        message:"Only numbers are allowed"
    },
    alphanumeric:{
        pattern: "^\\w+$",
        message: "Invalid project code"
    },
    email:{
        pattern: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
        message: "Invalid email id"
    },
    nameLike:{
        pattern: "^[a-zA-Z]+",
        message: "Invaid character for name"
    },
    multiWordNAme:{
        pattern: "^[a-zA-Z]+[ ][a-zA-z]",
        message: "Invaid character for name"
    },
    singleWordName: {
        pattern: "^[a-zA-Z]",
        message: "Invaid character for name"
    }
};