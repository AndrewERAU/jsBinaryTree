function Node(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
}

function BinaryTree() {
   this.root = null;
   this.outStr = "";
   this.startTime = null; // used to time each insert/search/remove
   this.endTime = null; // used to time each insert/search/remove
   this.startTimeMultiple = null; // used to time multiple insert/search/remove
   this.endTimeMultiple = null; // used to time multiple insert/search/remove

   this.printTraversals = function(startNode) {
      this.outStr = "Preorder: ";
      this.preorder(startNode);
      this.outStr = "Inorder: ";
      this.inorder(startNode);
      this.outStr = "Postorder: ";
      this.postorder(startNode);
   }

   this.showTime = function() {
      document.getElementById("status").innerHTML += " - " + (this.endTime-this.startTime).toFixed(2) + "ms";
   }
   this.showTimeMultiple = function() {
      document.getElementById("status").innerHTML += " - " + (this.endTimeMultiple-this.startTimeMultiple).toFixed(2) + "ms";
   }

   this.setStartTime = function() {
      //var d = new Date();
      //var n = d.getTime();
      //this.startTime = n;
      this.startTime = window.performance.now();
   }

   this.setEndTime = function() {
      //var d = new Date();
      //var n = d.getTime();
      //this.endTime = n;
      this.endTime = window.performance.now();
   }

   this.clearTextEntry = function() {
      document.getElementById("userNum").value = "";
   }

   this.invalidEntry = function(value) {
      return isNaN(value); // false if NaN
   }

   this.doMultipleOperations = function() {
      return (document.getElementById("userNum").value.slice(0,5) == "00000");
   }

   this.iterationsToPerform = function() {
      return parseInt(document.getElementById("userNum").value.slice(5));
   }


   this.insert = function(valueToInsert) {
      var multipleOps = false;
      if (this.doMultipleOperations()) {
          // put invalid entry check after getting data from parameter
          // pass data to invalid entry
          // only do bottom set end time, etc if typeof value to insert == "undefined"
          multipleOps = true;
          var numIterations = this.iterationsToPerform();
          document.getElementById("userNum").value = "";
          this.startTimeMultiple = window.performance.now();
          for (var i=1; i<= numIterations; i++) {
             // insert random values
             this.insert(Math.floor(Math.random() * 100000) + 1);
          }

          this.endTimeMultiple = window.performance.now();
          this.printTraversals(this.root);
          this.clearTextEntry();
          document.getElementById("status").innerHTML = numIterations + " values inserted!";
          this.showTimeMultiple();
          return;
      }
      this.setStartTime();
      var data = valueToInsert;
      if (typeof data == "undefined") {
         data = parseInt(document.getElementById("userNum").value);
      }
      if (this.invalidEntry(data)) return;
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
      if (typeof valueToInsert === "undefined") {
         this.setEndTime();
         document.getElementById("status").innerHTML = data + " inserted!";
         this.showTime();
         this.printTraversals(this.root);
         this.clearTextEntry();
      }
   }

   this.search = function(startNode,parentOfStartNode,dataToLookFor) { // dataToLookFor is optional
      this.setStartTime();
      if(typeof dataToLookFor === "undefined") {
         dataToLookFor = parseInt(document.getElementById("userNum").value);
      }
      if (this.invalidEntry(dataToLookFor)) return;
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

      this.setEndTime();
      if (trvPtr == null) {
         document.getElementById("status").innerHTML = dataToLookFor + " not found.";
         this.showTime();
         this.clearTextEntry();
         return [null,null];
      } else { // trvPtr.data == dataToLookFor
         document.getElementById("status").innerHTML = dataToLookFor + " found!";
         this.showTime();
         this.clearTextEntry();
         return [trvPtr,parentPtr];
      }
   }

   this.remove = function(startNode, parentOfStartNode, dataToRemove) { // dataToRemove is optional
      this.setStartTime();
      if (typeof dataToRemove === "undefined") {
         dataToRemove = parseInt(document.getElementById("userNum").value);
      }
      if (this.invalidEntry(dataToRemove)) return;
      var nodes = this.search(startNode, parentOfStartNode,dataToRemove);
      var nodeToRemove = nodes[0];
      var parentOfNodeToRemove = nodes[1];

      if (nodeToRemove == null) {
         this.setEndTime();
         document.getElementById("status").innerHTML = dataToRemove + " not removed (not found in tree)";
         this.showTime();
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

      this.setEndTime();
      document.getElementById("status").innerHTML = dataToRemove + " removed!";
      this.showTime();
      this.printTraversals(this.root);
      this.clearTextEntry();
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
