/* global expect */

describe("Sort Tests", function() {
	
	var commentSorter = CommentSorter();
	var comments = [];
	
	it("size will not change after sort", function(){
		comments = [{id: 1, date: 2}, {id: 2, date: 1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments.length).toEqual(2);
	});
	
	it("two comments with no parentids", function(){
		comments = [{id: 1, date: 2}, {id: 2, date: 1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(2);
	});
	
	it("three comments with no parentids parents are sorted in descending order", function(){
		comments = [{id: 4, date: 3}, {id: 1, date: 1}, {id: 2, date: 2}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(4);
		expect(comments[1].id).toEqual(2);
		expect(comments[2].id).toEqual(1);
	});
	
	it("three comments with first one being parent of third comment", function(){
		comments = [{id: 1, date: 1}, {id: 2, date: 2},{id: 3, date: 3, parentId:1 }];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(2);
		expect(comments[1].id).toEqual(1);
		expect(comments[2].id).toEqual(3);
	});
	
	it("two children belonging to one parent must reorder", function(){
		comments = [{id: 1, date: 1}, {id: 2, date: 4, parentId:1},{id: 3, date: 3, parentId:1 }];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(3);
		expect(comments[2].id).toEqual(2);
	});
	
	it("parent coming after child", function(){
		comments = [{id: 2, date: 4, parentId:1},{id: 1, date: 1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(2);
	});
	
	it("two children coming before parent and are in reverse order", function(){
		comments = [{id: 3, date: 5, parentId:1 }, {id: 2, date: 4, parentId:1},{id: 1, date: 1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(2);
		expect(comments[2].id).toEqual(3);
	});
	
	it("multiple parents and one children each, both children coming after parents", function() {
		comments = [{id: 1, date: 1},{id: 2, date: 4}, {id: 3, date: 5, parentId:1}, {id: 4, date: 6, parentId:2}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(2);
		expect(comments[1].id).toEqual(4);
		expect(comments[2].id).toEqual(1);
		expect(comments[3].id).toEqual(3);
	});
	
	it("multiple parents and one children each both children coming after parents in reverse order", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 4}, {id: 3, date: 5, parentId:2}, {id: 4, date: 6, parentId:1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(2);
		expect(comments[1].id).toEqual(3);
		expect(comments[2].id).toEqual(1);
		expect(comments[3].id).toEqual(4);
	});
	
	it("one parent is seperated by a parent with no children from its children", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 2}, {id: 3, date: 5, parentId:1}, {id: 4, date: 6, parentId:1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(2);
		expect(comments[1].id).toEqual(1);
		expect(comments[2].id).toEqual(3);
		expect(comments[3].id).toEqual(4);
	});
	
	it("children to children", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 2, parentId: 1},  {id: 4, date: 6, parentId:2}, {id: 3, date: 5, parentId:2}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(2);
		expect(comments[2].id).toEqual(3);
		expect(comments[3].id).toEqual(4);
	});
	
	it("one parent - multiple children should be sorted in ascending order", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 2, parentId: 1},  {id: 4, date: 6, parentId:1}, {id: 3, date: 5, parentId:1}];
		comments = commentSorter.sortByKey(comments);
		expect(comments[0].id).toEqual(1);
		expect(comments[1].id).toEqual(2);
		expect(comments[2].id).toEqual(3);
		expect(comments[3].id).toEqual(4);
	});
});

describe("Depth Tests", function() {
	
	var commentSorter = CommentSorter();
	var comments = [];
	var article = {};
	
	it("two comments with no parentids", function(){
		comments = [{id: 1, date: 2}, {id: 2, date: 1}];
		article.comments = comments;
		article = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(0);
	});
	
	it("three comments with no parentids", function(){
		comments = [{id: 4, date: 3}, {id: 1, date: 1}, {id: 2, date: 2}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(comments[0].depth).toEqual(0);
		expect(comments[1].depth).toEqual(0);
		expect(comments[2].depth).toEqual(0);
	});
	
	it("three comments with first one being parent of third comment", function(){
		comments = [{id: 1, date: 1}, {id: 2, date: 2},{id: 3, date: 3, parentId:1 }];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(comments[0].depth).toEqual(0);
		expect(comments[1].depth).toEqual(1);
		expect(comments[2].depth).toEqual(0);
	});
	
	it("two children belonging to one parent must reorder", function(){
		comments = [{id: 1, date: 1}, {id: 2, date: 4, parentId:1},{id: 3, date: 3, parentId:1 }];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(1);
	});
	
	it("parent coming after child", function(){
		comments = [{id: 2, date: 4, parentId:1},{id: 1, date: 1}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
	});
	
	it("two children coming before parent and are in reverse order", function(){
		comments = [{id: 3, date: 5, parentId:1 }, {id: 2, date: 4, parentId:1},{id: 1, date: 1}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(1);
	});
	
	it("multiple parents and one children each both children coming after parents", function() {
		comments = [{id: 1, date: 1},{id: 2, date: 4}, {id: 3, date: 5, parentId:1}, {id: 4, date: 6, parentId:2}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(0);
		expect(article.comments[3].depth).toEqual(1);
	});
	
	it("multiple parents and one children each both children coming after parents in reverse order", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 4}, {id: 3, date: 5, parentId:2}, {id: 4, date: 6, parentId:1}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(0);
		expect(article.comments[3].depth).toEqual(1);
	});
	
	it("one parent is seperated by a parent with no children from its children", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 2}, {id: 3, date: 5, parentId:1}, {id: 4, date: 6, parentId:1}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(1);
		expect(article.comments[3].depth).toEqual(0);
	});
	
	it("children to children", function(){
		comments = [{id: 1, date: 1},{id: 2, date: 2, parentId: 1},  {id: 4, date: 6, parentId:2}, {id: 3, date: 5, parentId:2}];
		article.comments = comments;
		comments = commentSorter.sortComments(article);
		expect(article.comments[0].depth).toEqual(0);
		expect(article.comments[1].depth).toEqual(1);
		expect(article.comments[2].depth).toEqual(2);
		expect(article.comments[3].depth).toEqual(2);
	});
});

