import * as yup from "yup";

const RegisterationSchema = new yup.object().shape({
    name: yup.string().required().min(5).max(16),
    username: yup.string().required().min(5).max(16),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.ref("password"),
});

export default RegisterationSchema;
