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

   this.search = function() {
      dataToLookFor = parseInt(document.getElementById("userNum").value);
      trvPtr = this.root;

      while (trvPtr != null && trvPtr.data != dataToLookFor) {
         if (dataToLookFor > trvPtr.data) {
            trvPtr = trvPtr.rightChild;
         } else if (dataToLookFor < trvPtr.data) {
            trvPtr = trvPtr.leftChild;
         }
      }

      if (trvPtr == null) {
         document.getElementById("status").innerHTML = dataToLookFor + " not found.";
      } else { // trvPtr.data == dataToLookFor
         document.getElementById("status").innerHTML = dataToLookFor + " found!";
      }
   }

   this.visit = function(node) {
      this.outStr += " " + node.data;
   }
   this.preorder = function(node) {
      if (node == null) return;
      this.visit(node);
      this.preorder(node.leftChild);
      this.preorder(node.rightChild);

      // show traversal string
      document.getElementById("preorderOutput").innerHTML = this.outStr;
   }
   this.inorder = function(node) {
      if (node == null) return;
      this.inorder(node.leftChild);
      this.visit(node);
      this.inorder(node.rightChild);

      // show traversal string
      document.getElementById("inorderOutput").innerHTML = this.outStr;
   }
   this.postorder = function(node) {
      if (node == null) return;
      this.postorder(node.leftChild);
      this.postorder(node.rightChild);
      this.visit(node);

      // show traversal string
      document.getElementById("postorderOutput").innerHTML = this.outStr;
   }
}

var binaryTree = new BinaryTree();
