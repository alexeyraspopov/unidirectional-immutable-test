var Rx = require('rx'),
	Immutable = require('immutable'),
	React = require('react'),
	uuid = require('uuid');

var seed = {
	'u1': 'Ann',
	'u2': 'Lisa',
	'u3': 'Scarlett'
};

var changeAction = Rx.Observable.fromEvent(document.querySelector('#name'), 'change')
		.map(function(event){
			return event.target.value;
		});

var addAction = Rx.Observable.fromEvent(document.querySelector('#add'), 'click')
		/*.flatMapLatest(function(){
			return changeAction;
		})*/
		.map(function(name){
			return {name: 'set', id: uuid.v4(), value: 'Boo'/*name*/};
		});

var removeAction = Rx.Observable.fromEvent(document.querySelector('main'), 'click')
		.filter(function(event){
			return event.target.dataset.role === 'removeItem';
		})
		.map(function(event){
			return {name: 'remove', id: event.target.dataset.id};
		});

var Store = Rx.Observable.merge(addAction, removeAction)
		.startWith(Immutable.Map(seed))
		.scan(function(data, operation){
			return data[operation.name](operation.id, operation.value);
		});

Store
	.subscribe(function(list){
		var layout = <ul>{ list.map(function(v, k){
				return <li key={ k }>{ v }<button data-role="removeItem" data-id={ k }>Remove</button></li>
			}).toArray() }</ul>;

		React.render(layout, document.querySelector('main'));
	});
