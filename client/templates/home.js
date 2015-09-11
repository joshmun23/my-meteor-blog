Template.home.created = function() {
	console.log('Created the home template');
};
Template.home.rendered = function() {
	console.log('Rendered the home template');
};
Template.home.destroyed = function() {
	console.log('Destroyed the home template');
};

Template.home.helpers({
	// exampleHelper: function() {
	// 	return new Spacebars.SafeString('This text came from a helper with some <strong>HTML</strong>.');
	// },
	// dataContextHelper: function() {
	// 	return {
	// 		someText: 'This text was set using a helper of the parent template.',
	// 		someNested: {
	// 			text: 'That comes from "someNested.text"'
	// 		}
	// 	};
	// }
	'postsList': function() {
		return [
			{
				title: 'My Second entry',
				description: 'Borem sodum color sit amet, consetetur sadipscing elitr.',
				author: 'Fabian Vogelsteller',
				timeCreated: moment().subtract(3,'days').unix()
			},
			{
				title: 'My First entry',
				description: 'Lorem ipsum dolor sit amet, consetetur saipscing elitr.',
				author: 'Fabian Vogelsteller',
				timeCreated: moment().subtract(7, 'days').unix()
			}
		];
	}
});
