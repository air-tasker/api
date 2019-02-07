export class UserAttr
{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_repeat: string;

    load(obj) {

        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.phone = obj.phone;
        this.password = obj.password;
        this.password_repeat = obj.password_repeat;

        return this;
    }

}
