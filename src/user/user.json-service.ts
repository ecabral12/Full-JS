import { User } from './user';
import { UserService } from './user-service';

export class UserJSONService implements UserService {
   
    public fs = require('fs');
    private filePath = './src/user/user.json'; 
    private users: User[] = [];
    add(username: string): User {
        let data = [];
        try {
            const file = this.fs.readFileSync(this.filePath, 'utf-8');
            this.users = JSON.parse(file);
        } catch (error) {
            console.error('error loading json :', error);
        }

        const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

        const newUser: User = {
            id: newId,
            username: username
        };

       this.users.push(newUser)

        this.fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
        console.log(this.users)

        return newUser;
    }
    getById(id: number): User | null {

     const user =  this.users.find(
            user => user.id == id
        )

      console.log("Elvis the id is : " + id)
      console.log("the tab is  : " + this.users)

        return user ||null   
    }
}