export const PatternsAndMessages = {
    numberOnly : {
        pattern:'^[0-9]+',
        message:"Only numbers are allowed"
    },
    email:{
        pattern: '^(.+)@(.+).(.+)$',
        message: "Invalid email id"
    },
    nameLike:{
        pattern: "^[a-zA-Z]+[ ][a-zA-z]",
        message: "Invaid character for name"
    }
};