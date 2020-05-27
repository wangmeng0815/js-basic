function ListNode(val) {
    this.val = val;
    this.next = null;
}

const merge = (l1, l2) => {
    const head = new ListNode();
    let cur = head;

    while(l1 && l2){
        if(l1.val < l2.val){
            cur.next = l1;
            l1 = l1.next
        } else {
            cur.next = l2;
            l2 = l2.next
        }

        cur = cur.next;
    }

    cur.next = l1 !== null ? l1 : l2;

    return head.next;
}

const deleteDistinct = (head) => {
    let cur = head;

    while(cur != null && cur.next != null){
        if(cur.val === cur.next.val){
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
}

const removeAll = (head) => {
    let dummy = new ListNode();

    dummy.next = head;

    let cur = dummy;

    while(cur.next != null && cur.next.next){

        if(cur.next.val === cur.next.next.val){

            let val = cur.next.val;
            while(cur.next && cur.next.val === val){
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }

    return dummy.next;
}

const removeFromEnd = (head, n) => {
    let dummy = new ListNode();
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    while(n !== 0){
        fast = fast.next;
        n--;
    }

    while(fast.next){
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
}

const reverse = (head) => {
    let pre = null;

    let cur = head;

    while(cur !== null){
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre
}

const reversePart = (head, m, n) => {
    const dummy = new ListNode();
    dummy.next = head;

    let p = dummy;
    for(let i = 0; i < m - 1; i++){
        p = p.next;
    }
    let leftHead = p;

    let temp = leftHead.next;
    let pre = temp;
    let cur = pre.next;

    for(let i = m; i < n; i++){
        let next = cur.next;
        cur.next = pre;

        pre = cur;
        cur = next;
    }

    leftHead.next = pre;

    temp.next = cur;

    return dummy.next;
}

/**
 * 给定一个链表，判断链表中是否有环。
 */
const validCircle = (head) => {

    let cur = head;

    while(cur != null){
        if(cur.flag){
            return true;
        } else {
            cur.flag = true;
            cur = cur.next;
        }
    }

    return false;
}

/**
 * 给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。
 */
const validCircle = head => {
    let cur = head;

    while(cur){
        if(cur.flag){
            return cur
        } else {
            cur.flag = true;
            cur = cur.next;
        }
    }

    return null;
}

/**
 * 编写一个程序，找到两个单链表相交的起始节点。
 */
var getIntersectionNode = function(headA, headB){
    let pA = headA;
    let pB = headB;
    while( pA !== pB ){
        pA = pA.next ? pA.next : headB;
        pB = pB.next ? pB.next : headA;
    }

    return pA;
}