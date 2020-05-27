function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}

const node = new TreeNode(1)


const root = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: 'C',
        right: {
            val: 'F'
        }
    }
}

function preOrder(root){
    if(!root){
        return;
    }

    console.log('当前遍历的节点值: ', root.val);

    preOrder(root.left)

    preOrder(root.right)
}

// preOrder(root);

function inOrder(root){
    if(!root){
        return;
    }

    inOrder(root.left);
    console.log('当前遍历的节点值: ', root.val);
    inOrder(root.right)

}

// inOrder(root)


