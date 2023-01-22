export type ClickOutsideHandler = (
	node: Node,
	callback: (ev: MouseEvent) => any
) => {
	destroy: () => void;
};

export const clickOutside: ClickOutsideHandler = (node, callback) => {
	const handler = (ev: MouseEvent) => {
		if (!node.contains(ev.target as Node)) {
			callback(ev);
		}
	};

	document.addEventListener('click', handler);

	return {
		destroy() {
			document.removeEventListener('click', handler);
		}
	};
};
