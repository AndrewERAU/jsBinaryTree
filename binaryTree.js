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
      this.preorder(startNode);
      this.inorder(startNode);
      this.postorder(startNode);
   }
   this.insert = function() {
      var data = document.getElementById("userNum").value;
      var nodeToInsert = new Node(data);
      var trvPtr = this.root;

      if (this.root == null) this.root = nodeToInsert; // insert to empty tree
      else {
         while (trvPtr.rightChild != nodeToInsert && trvPtr.leftChild != nodeToInsert {
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
      this.printTraversals(this.root);
   }

   this.visit = function(node) {
      this.outStr += " " + node.data;
   }
   this.preorder = function(node) {
      if (node == null) return;
      this.visit(node);
      this.preorder(node.leftChild);
      this.preorder(node.rightChild);

      // show traveral string
      document.getElementById("output").innerHTML = this.outStr;
   }
   this.inorder = function(node) {
      if (node == null) return;
   }
   this.postorder = function(node) {
      if (node == null) return;
   }
}

var binaryTree = new BinaryTree();
