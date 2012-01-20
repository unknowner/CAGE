// version stuff
version = {
	major : 1,
	minor : 1,
	revision : 11,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + version.state;
	},
	file : function() {
		return version.major + '_' + version.minor + '_' + version.revision + version.state;
	}
};
