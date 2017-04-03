var x = 2000
function myFunction() {
    var tmp = document.getElementById("userNum").value * document.getElementById("userNum").value;
    document.getElementById("output").innerHTML = tmp;
}

function init() {
   document.getElementById("output").innerHTML = x;
}

window.onload = init;


/*function Apple (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}*/
// Start
function Node(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
}

function BinaryTree() {
   this.root = null;
   this.outStr = "";

   this.printTraversals = function(startNode) {
      this.outStr = "Preorder: ";
      this.preorder(startNode);
      this.outStr = "Inorder: ";
      this.inorder(startNode);
      this.outStr = "Postorder: ";
      this.postorder(startNode);
   }
   this.insert = function() {
      var data = parseInt(document.getElementById("userNum").value);
      var nodeToInsert = new Node(data);
      var trvPtr = this.root;

      if (this.root == null) this.root = nodeToInsert; // insert to empty tree
      else {
         while (trvPtr.rightChild != nodeToInsert && trvPtr.leftChild != nodeToInsert) {
            if (nodeToInsert.data >= trvPtr.data) {
               if (trvPtr.rightChild == null) {
                  trvPtr.rightChild = nodeToInsert;
               } else {
                  trvPtr = trvPtr.rightChild;
               }
            } else { // nodeToInsert.data > trvPtr.data
               if (trvPtr.leftChild == null) {
                  trvPtr.leftChild = nodeToInsert;
               } else {
                  trvPtr = trvPtr.leftChild;
               }
            }
         }
      }
      document.getElementById("status").innerHTML = data + " inserted!";
      this.printTraversals(this.root);
   }

   this.search = function(startNode,parentOfStartNode,dataToLookFor) { // dataToLookFor is optional
      if(typeof dataToLookFor === "undefined") {
         dataToLookFor = parseInt(document.getElementById("userNum").value);
      }
      var trvPtr = startNode;
      var parentPtr = parentOfStartNode; // used for node removal (see remove function)

      while (trvPtr != null && trvPtr.data != dataToLookFor) {
         parentPtr = trvPtr;
         if (dataToLookFor < trvPtr.data) {
            trvPtr = trvPtr.leftChild;
         } else if (dataToLookFor > trvPtr.data) {
            trvPtr = trvPtr.rightChild;
         }
      }

      if (trvPtr == null) {
         document.getElementById("status").innerHTML = dataToLookFor + " not found.";
         return [null,null];
      } else { // trvPtr.data == dataToLookFor
         document.getElementById("status").innerHTML = dataToLookFor + " found!";
         return [trvPtr,parentPtr];
      }
   }

   this.remove = function(startNode, parentOfStartNode, dataToRemove) { // dataToRemove is optional
      if (typeof dataToRemove === "undefined") {
         dataToRemove = parseInt(document.getElementById("userNum").value);
      }
      var nodes = this.search(startNode, parentOfStartNode,dataToRemove);
      var nodeToRemove = nodes[0];
      var parentOfNodeToRemove = nodes[1];

      if (nodeToRemove == null) {
         document.getElementById("status").innerHTML = dataToRemove + " not removed (not found in tree)";
         return null;
      } else if (nodeToRemove.leftChild == null && nodeToRemove.rightChild == null) {
         // both children equal null. easy. simply remove node
         if (nodeToRemove == this.root) {
            this.root = null; // tree was just 1 node, now its 0 nodes
         } else if (parentOfNodeToRemove.leftChild != null &&
            parentOfNodeToRemove.leftChild.data == nodeToRemove.data) {
            // finds child of parent that should be deleted
            parentOfNodeToRemove.leftChild = null;
         } else {
            parentOfNodeToRemove.rightChild = null;
         }
      } else if (nodeToRemove.leftChild == null || nodeToRemove.rightChild == null) {
         // one child equals null. have parent point to child
         if (nodeToRemove.leftChild == null) {
            if (nodeToRemove == this.root) {
               this.root = this.root.rightChild;
            } else if (parentOfNodeToRemove.leftChild != null &&
               parentOfNodeToRemove.leftChild.data == nodeToRemove.data) {
               // finds child of parent that should be deleted
               parentOfNodeToRemove.leftChild = nodeToRemove.rightChild;
            } else {
               parentOfNodeToRemove.rightChild = nodeToRemove.rightChild;
            }
         } else {// right child == null
            if (nodeToRemove == this.root) {
               this.root = this.root.leftChild;
            } else if (parentOfNodeToRemove.leftChild != null &&
               parentOfNodeToRemove.leftChild.data == nodeToRemove.data) {
               // finds child of parent that should be deleted
               parentOfNodeToRemove.leftChild = nodeToRemove.leftChild;
            } else {
               parentOfNodeToRemove.rightChild = nodeToRemove.leftChild;
            }
         }
      } else { // node-to-remove has 2 children
         // no special logic required for removing root in this case
         // find smallest value in right subtree
         trvPtr = nodeToRemove.rightChild;
         var minimumNode = null;
         while (trvPtr != null) {
            minimumNode = trvPtr;
            trvPtr = trvPtr.leftChild;
         }
         // replace value of node-to-remove with value of minimum
         nodeToRemove.data = minimumNode.data;

         // remove minimum node from right subtree since it has been moved
         this.remove(nodeToRemove.rightChild,nodeToRemove,nodeToRemove.data);
      }

      document.getElementById("status").innerHTML = dataToRemove + " removed!";
      this.printTraversals(this.root);
   }

   this.visit = function(node) {
      this.outStr += " " + node.data;
   }
   this.preorder = function(node) {
      if (node != null) {
         this.visit(node);
         this.preorder(node.leftChild);
         this.preorder(node.rightChild);
      }

      // show traversal string
      document.getElementById("preorderOutput").innerHTML = this.outStr;
   }
   this.inorder = function(node) {
      if (node != null) {
         this.inorder(node.leftChild);
         this.visit(node);
         this.inorder(node.rightChild);
      }

      // show traversal string
      document.getElementById("inorderOutput").innerHTML = this.outStr;
   }
   this.postorder = function(node) {
      if (node != null) {
         this.postorder(node.leftChild);
         this.postorder(node.rightChild);
         this.visit(node);
      }

      // show traversal string
      document.getElementById("postorderOutput").innerHTML = this.outStr;
   }
}

var binaryTree = new BinaryTree();
