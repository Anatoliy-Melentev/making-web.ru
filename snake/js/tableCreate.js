function tableCreate(width, height){
	//document.body.innerHTML = ''
	this.body = document.body;
	this.tbl  = document.createElement('table');
	this.cellWidth = 20;
	this.borderWidth = 1;
	this.w = width ? width : 60;
	this.h = height ? height : 25;
	this.tableWidth = this.w * (this.cellWidth + (this.borderWidth * 2)) + 2;
	this.trstyle = {
		width: this.cellWidth + 'px',
		height: this.cellWidth + 'px',
	};
	this.tdstyle = {
		width: this.cellWidth + 'px',
		height: this.cellWidth + 'px',
		border: this.borderWidth + 'px solid black',
	};
	this.tblstyle = {
		width: this.tableWidth + 'px',
		border: this.borderWidth + 'px solid black'
	};

	this.setStyle = function (el, style) {
		for (const property in style) {
			el.style[property] = style[property];
		}
	};

	this.setStyle(this.tbl, this.tblstyle);

	for(let i = 0; i < this.h; i++){
		let tr = this.tbl.insertRow();
		this.setStyle(tr, this.trstyle);
		for(let j = 0; j < this.w; j++){
			let td = tr.insertCell();
			td.appendChild(document.createTextNode(' '));
			this.setStyle(td, this.tdstyle);
		}
	}
	this.body.appendChild(this.tbl);
}

