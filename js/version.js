/** Current version, used for displaying and Firefox update check */
version = {
	major : 1,
	minor : 3,
	revision : 1,
	build : 0,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + '.' + version.build + version.state;
	}
};
