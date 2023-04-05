export const PatternsAndMessages = {
    numberOnly : {
        pattern:"[A-Za-z]{3}",
        message:"Only numbers are allowed"
    },
    email:{
        pattern: "/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/",
        message: "Invalid email id"
    },
    nameLike:{
        pattern: "^[a-zA-Z\\s]+",
        message: "Invaid character for name"
    }
};