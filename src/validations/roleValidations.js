import {required} from "vuelidate/lib/validators";

export const roleValidation = {
    role: {
        name: {required},
        description: {required}
    }
}
