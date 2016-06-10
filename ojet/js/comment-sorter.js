var CommentSorter = function() {
	'use strict';
	
	var key = "date";
	var _array = [];
	var _lookup = {};
	var _parents = [];
	var _comments = [];
	var _rootComments = [];
	
	var _util = {
		
		populateComment: function populateComment(comment) {
			_comments.push(comment);
			var children = _parents[comment.id];
			if(children) {
				for(var i = 0; i < children.length; i++)
					populateComment(children[i]);
			}
		}, 
		
		setArray: function(array) {
			_array = array;
			
			// find all parent ids and sort them in date descending order
			_rootComments = [];
			_parents = [];
			_comments = [];
			_lookup = [];
			
			for(var i = 0; i < array.length; i++) {
				if(array[i].parentId) {
					if(!_parents[array[i].parentId])
						_parents[array[i].parentId] = [array[i]];
					else {
						parent = _parents[array[i].parentId];
						var j = 0;
						while(j < parent.length && parent[j].date <= array[i].date)
							j++;
						if(j === parent.length)
							parent.push(array[i]);
						else
							parent.splice(j, 0, array[i]);
					}
				} else {
					var j = 0;
					while(j < _rootComments.length && _rootComments[j].date >= array[i].date)
						j++;
					if(j === _rootComments.length)
						_rootComments.push(array[i]);
					else
						_rootComments.splice(j, 0, array[i]);
				}
				_lookup[array[i].id] = array[i];
			}
		}
	};
	
	return {
		sortComments: function sortComments(article) {
			var comments = article.comments;
			_util.setArray(comments);
			comments = this.sortByKey();
			
			comments[0].depth = 0;
			var depth = 0;
			for(var i = 1; i < comments.length; i++) {
				if(!comments[i].parentId) {
					comments[i].depth = 0;
					depth = 0;
					continue;
				}
				
				if(comments[i-1].id === comments[i].parentId) {
					depth++;
					comments[i].depth = depth;
				} else if(comments[i-1].parentId === comments[i].parentId) {
					comments[i].depth = comments[i-1].depth;
				} else {
					var temp = comments[i-1].parentId;
					var j = 2;
					while(temp && temp.parentId !== comments[i].parentId) {
						depth--;
						temp = comments[i-j];
						j++;
					}
					if(temp)
						comments[i].depth = temp.depth;
					else
						comments[i].depth = 0;
//					depth--;
//					comments[i].depth = depth;
				}
			}
			article.comments = comments;
			return article;
		},
		
		sortByKey: function sortByKey(array) {
			if(array)
				_util.setArray(array);
			_comments = [];
			for(var i = 0; i < _rootComments.length; i++) {
				_util.populateComment(_rootComments[i]);
			}
			
			return _comments;
		}
	};
};

CommentSorter(window);
