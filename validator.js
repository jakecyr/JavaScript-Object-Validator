var Rule = function(options){
		if(!options) return;

		if(typeof options === 'string'){
			options = {type: options};
		}

		return{
			test: function(valueToTest){
				if(options.type === 'number'){
					if(typeof valueToTest !== 'number'){
						return false;
					}

					if(options.min){
						if(valueToTest < options.min){
							return false;
						}
					}

					if(options.max){
						if(valueToTest > options.max){
							return false;
						}
					}

					return true;
				} else if(options.type === 'string'){
					if(typeof valueToTest !== 'string'){
						return false;
					}

					if(options.minlength){
						if(valueToTest.length < options.minlength){
							return false;
						}
					}

					if(options.maxlength){
						if(valueToTest.length > options.maxlength){
							return false;
						}
					}

					if(options.in){
						if(options.in.indexOf(valueToTest) == -1){
							return false;
						}
					}

					return true;
				} else if(options.type === 'boolean'){
					return typeof valueToTest === 'boolean';
				} else if(options.type === 'object'){
					return typeof valueToTest === 'object';
				} else if(options.type === 'array'){
					return valueToTest.constructor === Array;
				} else if(options.type === 'function'){
					return typeof valueToTest === 'function';
				}

				return false;
			}
		}
	};

	var Validator = function(options){
		if(!options) return;

		return{
			test: function(objectToTest){
				if(!objectToTest) return false;

				let errors = [];

				for(let key in options){
					if(!objectToTest[key]){
						errors.push({key: key, reason: 'Key not in tested object'});
						return false;
					}

					if(!options[key].test(objectToTest[key])){
						errors.push({key: key, reason: 'Failed rule'});
					}
				}

				return{
					hasError: (errors.length > 0),
					errors: errors
				};
			}
		}
	};
