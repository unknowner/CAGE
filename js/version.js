/** Current version, used for displaying and Firefox update check */
version = {
	major : 1,
	minor : 2,
	revision : 19,
	build : 4,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + '.' + version.build + version.state;
	}
};
