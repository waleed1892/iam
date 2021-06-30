import {required, email} from "vuelidate/lib/validators";

export const loginValidation = {
    email: {required, email},
    password: {required}
}
