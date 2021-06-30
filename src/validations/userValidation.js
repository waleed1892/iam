import {required} from "vuelidate/lib/validators";

export default {
    user: {
        // userType: '',
        first_name: {required},
        last_name: {required},
        username: {required},
        primary_email: '',
        secondary_email: '',
        groups: '',
        password: '',
        email: {required}
    }
}
