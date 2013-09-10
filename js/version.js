/** Current version, used for displaying and Firefox update check */
version = {
	major : 1,
	minor : 4,
	revision :0,
	build : 7,
	state : 'b',
	string : function() {
		return version.major + '.' + version.minor + '.' + version.revision + '.' + version.build + version.state;
	}
};
