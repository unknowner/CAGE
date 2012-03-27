// version stuff
version = {
	major : 1,
	minor : 1,
	revision : 31,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + version.state;
	}
};
