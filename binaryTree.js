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
function Node (data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
}

function BinaryTree() {
   this.root = null;
   this.outStr = "";

   this.visit = function(node) {
      this.outStr += " " + node.data;
   }
   this.preorder = function (node) {
      if (node == null) return;
      this.visit(node);
      this.preorder(node.leftChild);
      this.preorder(node.rightChild);

      // show traveral string
      document.getElementById("output").innerHTML = this.outStr;
   }
}

function test() {
   var tree = new BinaryTree();
   tree.root = new Node(5);
   tree.root.leftChild = new Node(2);
   tree.root.rightChild = new Node(102);
   tree.preorder(tree.root);
}
