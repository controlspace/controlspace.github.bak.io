/** @namespace Service */
var Service = (function(global) {
  'use strict';

  /**
   * Article object structure.
   * @typedef {{
   *   id: string,
   *   title: string,
   *   content: string,
   *   date: number,
   *   userName: string,
   *   comments: !Array<!Comment>
   * }} Article
   */

  /**
   * Comment object structure.
   * @typedef {{
   *   id: string,
   *   parentId: ?string,
   *   content: string,
   *   userName: string,
   *   date: number
   * }} Comment
   */

  /** @private */
  var util_ = {
    /**
     * @param {number} size
     * @return {!Array<string>}
     */
    createIterable: function(size) {
      return size ? Array(size).join('.').split('.') : [];
    },
    /**
     * @param {*} candidate
     * @return {boolean}
     */
    isEmptyString: function(candidate) {
      return typeof candidate === 'string' && !candidate.length;
    },
    /**
     * @param {number} n
     * @return {boolean}
     */
    isEven: function(n) {
      return n % 2 === 0;
    },
    /**
     * @param {number} articleId
     * @return {!Array<!Comment>}
     */
    generateComments: function(articleId) {
      return this.createIterable(this.isEven(articleId) ? 100 : 50)
        .map(this.commentMapper.bind(articleId));
    },
    /**
     * @param {string} item
     * @param {number} index
     * @return {!Article}
     */
    articleMapper: function(item, index) {
      return {
        id: 'article_id_' + index,
        title: 'Article #' + index + ' Title',
        content: 'Content of the article #' + index,
        date: +new Date(2016, 0, index),
        userName: 'Article #' + index + ' user name',
        comments: this.generateComments(index)
      };
    },
    /**
     * @this {number}
     * @param {string} item
     * @param {number} index
     * @return {!Comment}
     */
    commentMapper: function(item, index) {
      var baseIndex = this * 1000;
      var parentIndex = index > 10 && util_.isEven(index) ?
          Math.floor(Math.random() * (index - 10)) + baseIndex : null;
      var parentId = parentIndex ? 'comment_id_' + parentIndex : '';
      var parentInfo = parentId ? ' (parent: ' + parentId + ')' : '';
      var commentId = baseIndex + index;
      return {
        id: 'comment_id_' + commentId,
        parentId: parentId,
        date: +new Date(2016, 0, index),
        userName: 'Comment #' + commentId + ' user name',
        content: 'Comment #' + commentId + parentInfo
      };
    }
  };


  /**
   * @private
   * @type {!Array<!Article>}
   */
  var articles_ =
      util_.createIterable(100).map(util_.articleMapper.bind(util_));

  return {
    /**
     * Retrieves a list of all known articles.
     * @return {!Promise<!Array<!Article>>}
     */
    getAllArticles: function() {
      return new Promise(function(resolve, reject) {
        global.setTimeout(resolve.bind(null, articles_), 0);
      });
    },

    /**
     * Retrieves a list of articles filtered by the specified query.
     * @param {string} query
     * @return {!Promise<!Array<!Article>>}
     */
    findArticlesByQuery: function(query) {
      return new Promise(function(resolve, reject) {
        global.setTimeout(function() {
          util_.isEmptyString(query) ?
            reject('Query should not be empty!') :
            resolve(articles_.filter(function(article) {
              return new RegExp(query, 'im').test(
                [article.title, article.content, article.author].join('\n'));
            }));
        }, 0);
      });
    }
  };
})(window);
