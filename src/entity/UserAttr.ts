export class UserAttr
{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_repeat: string;

    load(obj) {

        let user = this;
        user.first_name = obj.first_name;
        user.last_name = obj.last_name;
        user.email = obj.email;
        user.phone = obj.phone;
        user.password = obj.password;
        user.password_repeat = obj.password_repeat;

        return user;
    }

}
