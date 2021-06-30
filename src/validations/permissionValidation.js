import {required} from "vuelidate/lib/validators";

export const permissionValidation = {
    permission: {
        name: {required},
        description: {required}
    }
}
