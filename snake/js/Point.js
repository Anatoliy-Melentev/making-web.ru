function Point (table, x, y, color) {
	this.x = x-1;
	this.y = y-1;
	this.color = color;
	this.body = document.body;
	this.table = this.body.getElementsByTagName('table');
	this.cell = this.table[0].children[0].children[this.y].children[this.x]

	table.setStyle(this.cell,{'background-color': this.color});

}