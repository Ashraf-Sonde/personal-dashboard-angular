// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string
  text: string
  completed: boolean

  constructor(text: string) {
    this.id = uuidv4()
    this.text = text
  }
}
