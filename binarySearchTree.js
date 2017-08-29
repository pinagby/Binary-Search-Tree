;(function(exports){
	function Node(key){
		this.key = key;
		this.left = null;
		this.right = null;
	}
	function BinarySearchTree(){
		this.root = null;
	}
	BinarySearchTree.prototype = {
		insert:function(key){
			var newNode = new Node(key);
			function insertNode(node,newNode){
				if(newNode.key < node.key){
					if(node.left === null){
						node.left = newNode;
					}else{
						insertNode(node.left, newNode);
					}
				}else{
					if(node.right === null){
						node.right = newNode;
					}else{
						insertNode(node.right,newNode);
					}
				}
			}
			if(this.root === null){
				this.root = newNode;
			}else{
				insertNode(this.root,newNode);
			}
		},
		search:function(key){
			function searchNode(node,key){
				if(node == null){
					return false;
				}
				if( key < node.key ){
					return searchNode(node.left,key);
				}else if( key > node.key ){
					return searchNode(node.right,key);
				}else{
					return true;
				}
			}

			return searchNode(this.root,key);
		},
		inOrderTraverse:function(callback){
			function inOrderTraverseNode(node,callback){
				if(node !== null){
					inOrderTraverseNode(node.left,callback);
					callback(node.key);
					inOrderTraverseNode(node.right,callback);
				}
			}
			inOrderTraverseNode(this.root,callback);
		},
		preOrderTraverse:function(callback){
			function preOrderTraverseNode(node,callback){
				if(node !== null){
					callback(node.key);
					preOrderTraverseNode(node.left,callback);
					preOrderTraverseNode(node.right,callback);
				}
			}
			preOrderTraverseNode(this.root,callback);
		},
		postOrderTraverse:function(callback){
			function postOrderTraverseNode(node,callback){
				if(node !== null){
					postOrderTraverseNode(node.left,callback);
					postOrderTraverseNode(node.right,callback);
					callback(node.key);
				}
			}
			postOrderTraverseNode(this.root,callback);
		},
		min:function(){
			var node = this.root;

			if(node){
				while(node.left){
					node = node.left;
				}
				return node.key;
			}

			return null;
		},
		max:function(){
			var node = this.root;
			if(node){
				while(node.right){
					node = node.right;
				}

				return node.key;
			}
			return null;
		},
		remove:function(key){
			function findMinNode(node){
				while(node.left){
					node = node.left;
				}
				return node;
			}

			function removeNode(node,key){
				if(node === null){
					return null;
				}
				if( key < node.key ){
					node.left = removeNode(node.left,key);
					return node;
				}else if( key > node.key ){
					node.right = removeNode(node.right,key);
					return node;
				}

				if(node.left === null && node.right === null){ //叶节点
					node = null;
					return node;
				}

				if(node.left === null){ //有左节点
					node = node.right;
					return node;
				}else if(node.right === null){ //有右节点
					node = node.left;
					return node;
				}
				//有两个子节点的节点，用该节点右侧最小的节点替代当前节点
				var rightMinNode = findMinNode(node.right);
				node.key = rightMinNode.key;
				node.right = removeNode(node.right,rightMinNode.key);
				return node;
			}

			this.root = removeNode(this.root,key);
		},
		printNode:function(value){
			console.log(value);
		},
		printTreeTo:function(id){
			var that = this,
				arr = [],
				dep = that.depth();
			if(!this.root) return [];
			arr[0] = [];
			arr[0].push(this.root);
			for(var i = 1;i<dep;i++){
				for(var j = 0;j<Math.pow(2,i-1);j++){
					if(!arr[i]){ arr[i] = []; }
					var item = arr[i-1][j],
						left = item.left ? item.left : {},
						right = item.right ? item.right : {};
					arr[i].push(left)
					arr[i].push(right);
				}
			}

			//绘制
			that.draw(arr,dep);
		},
		draw:function(arr,dep){
			var k = arr[dep-1].length;
			var itemW = 20;
			var itemH = 50;
			var container = document.createElement('div');
			container.style.position = 'relative';
			container.style.width = k*itemW+'px';
			container.style.height = dep*itemH+'px';
			document.body.appendChild(container);

			for(var x = 0;x<dep;x++){
				var str = '';
				var splitNum = k/(Math.pow(2,x)+1);
				for(var y = 0;y<Math.pow(2,x);y++){
					var elem = document.createElement('span');
					var curItem = arr[x][y];
					var itemKey = curItem.key ? curItem.key : "";
					elem.style.position = 'absolute';
					elem.style.boxSizing = 'border-box';
					elem.style.border = '1px solid #ddd';
					elem.style.borderRadius = '50%';
					elem.style.fontSize = '12px';
					elem.style.textAlign = 'center';
					elem.style.lineHeight = itemW+'px';
					elem.style.width = itemW+'px';
					elem.style.height = itemW+'px';
					elem.style.top = x*itemH+'px';
					elem.style.left = splitNum*(y+1)*itemW + 'px';
					elem.innerHTML = itemKey;
					container.appendChild(elem);
				}
			}
		},
		depth:function(){
			function mMax(a,b){
				return a > b ? a : b;
			}
			function getDepth(node){
				var d = 0;
				if(node === null){
					return 0;
				}
				d += 1;
				if(node.left || node.right){
					d += mMax(getDepth(node.left),getDepth(node.right));
				}
				return d;
			}

			return getDepth(this.root);
		}
	}
	exports.create = function() {
        return new BinarySearchTree();
    };
})(typeof exports === 'undefined' ? this['BST'] = {} : exports);
