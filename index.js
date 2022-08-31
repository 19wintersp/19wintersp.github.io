// All of this is just nice-to-have, and is optional.

/* Scroll detection */

//if (location.hash && location.hash.length > 1)
if (document.documentElement.scrollTop > 100)
	document.getElementsByTagName("nav")[0].classList.add("open");

/* Light re-randomisation */

const lights = document.querySelectorAll("#light-show > div > div");
for (const light of Array.from(lights)) {
	if (light.classList.contains("blue")) continue;

	const delay = Math.round(1 + Math.random() * 48) / 10;
	light.style.setProperty("--d", `${delay}s`);

	const on = Math.random() > 0.5;
	light.classList.remove(on ? "off" : "on");
	light.classList.add(on ? "on" : "off");
}

/* Auto-update repository properties */

const repos = document.querySelectorAll("[data-repo]");
for (const repo of Array.from(repos)) {
	fetch("https://api.github.com/repos/" + repo.getAttribute("data-repo"))
		.then((res) => res.json())
		.then((data) => {
			console.dir(data);

			const values = repo.querySelectorAll("[data-value]");
			for (const value of Array.from(values)) {
				let node = data;
				for (const part of value.getAttribute("data-value").split("."))
					node = node[part];

				value.innerText = node.toString();
			}
		});
}
