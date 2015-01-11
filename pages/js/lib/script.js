var App = angular.module('RSSFeedApp', ['ngResource']);

		App.controller("FeedCtrl", ['$scope', 'FeedService',                             //at this pt factory called
			function ($scope, Feed) {
				console.log('inside FeedCtrl');
				$scope.loadButonText = "Start Reading";
				$scope.title='';
				$scope.loadFeed = function (e) {
					console.log('inside loadFeed funcn');
					Feed.parseFeed($scope.feedSrc).then(function (res) {
						console.log('inside Feed.parseFeed funcn');
						//$scope.loadButonText = angular.element(e.target).text();
						$scope.loadButonText = res.data.responseData.feed.title;
						$scope.feeds = res.data.responseData.feed.entries;
						console.log(res);
						$scope.title= res.data.responseData.feed.title;
						$scope.feedSrc='';
						
						
					});
				}
				
}]);


		App.factory('FeedService', ['$http',
			function ($http) {
				console.log('factory called');
				return {
					parseFeed: function (url) {     //($scope.feedSrc) ==> (url)
						return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
					}
				}

}]);


App.controller("feedController", ['$scope','$resource', function($scope, $resource){
	var Feed = $resource('/api/feed');
	$scope.feedsCount = "1";
	$scope.feeds=[];
	/*$scope.feeds = [
		{name: "http://edition.cnn.com/"},
		{name: "www.bbc.com"}
	]*/
	Feed.query(function(results){
		$scope.feeds = results;
	}); 
	
	$scope.createFeed = function(){
		/*$scope.feeds.push({ name: $scope.feedName});
		$scope.feedName = '';*/
		var feed = new Feed();          //feed is new instance of Feed()...when it is called the server calls the restful service of the controller i.e $resource and tries to save that.
		feed.name = $scope.feedName;
		feed.link = $scope.feedLink;
		feed.$save(function(result){
			$scope.feeds.push(result);
			$scope.feedName = '';
			$scope.feedLink = '';
		});
		
	}
		
}]);