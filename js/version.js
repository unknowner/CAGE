// version stuff
version = {
	major : 1,
	minor : 2,
	revision : 0,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + version.state;
	}
};
