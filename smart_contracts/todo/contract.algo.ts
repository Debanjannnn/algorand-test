import { Contract, GlobalState } from '@algorandfoundation/algorand-typescript'

export class Todo extends Contract {
 todolist = GlobalState<string>({
    key: "todolist",
    initialValue : " "
 })

 Addtodo(title:string, description:string):string {
    this.todolist.value = title + "" +  description;
    return title;
 }
}
