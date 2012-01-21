// version stuff
version = {
	major : 1,
	minor : 1,
	revision : 12,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + version.state;
	}
};
