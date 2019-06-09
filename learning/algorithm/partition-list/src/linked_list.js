import LinkedListNode from './linked_list_node'
class LinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
  }
  append(val){
    let node = new LinkedListNode(val);
    tail.next = node;
  }
}
export default LinkedList;
