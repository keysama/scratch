export const setStore = (name, content) => {
	if (!name) return;
	console.log('set',content)
	if (typeof content !== "string") {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}



